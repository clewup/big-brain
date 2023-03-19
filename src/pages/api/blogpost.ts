import type { NextApiRequest, NextApiResponse } from "next";
import { BlogPost } from "@/types/blogPost";
import { HttpMethods } from "@/enums/httpMethods";
import { connectDb } from "@/lib/mongo/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectDb();

  const handleGet = async () => {
    const { category, id } = req.query;

    if (category) {
      const blogPosts = await db
        .collection<BlogPost>("BlogPost")
        .find({ category: category })
        .toArray();

      res.status(200);
      res.json(blogPosts);
      return;
    }

    if (id) {
      const blogPosts = await db
        .collection<BlogPost>("BlogPost")
        .find({ id: Number(id) })
        .toArray();

      res.status(200);
      res.json(blogPosts);
      return;
    }

    const blogPosts = await db
      .collection<BlogPost>("BlogPost")
      .find({})
      .toArray();

    res.status(200);
    res.json(blogPosts);
    return;
  };

  const handlePost = async () => {
    const blogPost = await db
      .collection<BlogPost>("BlogPost")
      .insertOne(req.body);

    res.status(201);
    res.json(blogPost);
  };

  switch (req.method) {
    case HttpMethods.GET:
      await handleGet();
      break;

    case HttpMethods.POST:
      await handlePost();
      break;

    default:
      return res.status(405);
  }
};
export default handler;
