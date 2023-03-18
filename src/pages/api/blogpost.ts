import type { NextApiRequest, NextApiResponse } from "next";
import { mockBlogPosts } from "@/components/molecules/BlogPost/testUtils/mockData";
import { BlogPost } from "@/types/blogPost";
import { HttpMethods } from "@/enums/httpMethods";
import { connectDb } from "@/lib/mongo/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != HttpMethods.GET) {
    res.status(405);
    res.send({ message: "Only GET requests are allowed." });
    return;
  }

  const { db } = await connectDb();

  const { category, id } = req.query;

  if (category) {
    const blogPosts = await db
      .collection("BlogPost")
      .find({ category: category })
      .toArray();

    res.status(200);
    res.json(blogPosts);
    return;
  }

  if (id) {
    const blogPosts = await db
      .collection("BlogPost")
      .find({ id: id })
      .toArray();

    res.status(200);
    res.json(blogPosts);
    return;
  }

  const blogPosts = await db.collection("BlogPost").find({}).toArray();

  res.status(200);
  res.json(blogPosts);
  return;
}

const fetchBlogPostsByCategory = (category: string) => {};
