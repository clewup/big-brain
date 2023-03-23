import type { NextApiRequest, NextApiResponse } from "next";
import { BlogPost } from "@/types/blogPostTypes";
import { HttpMethods } from "@/enums/httpMethods";
import { connectDb } from "@/lib/mongo/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectDb();

  switch (req.method) {
    case HttpMethods.POST:
      const blogPost = await db.collection("BlogPost").insertOne(req.body);

      res.status(201);
      return res.json(blogPost);

    case HttpMethods.GET:
      const blogPosts = await db
        .collection<BlogPost>("BlogPost")
        .find({})
        .toArray();

      res.status(200);
      return res.json(blogPosts);

    default:
      return res.status(405);
  }
};
export default handler;
