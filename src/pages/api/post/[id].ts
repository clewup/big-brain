import type { NextApiRequest, NextApiResponse } from "next";
import { BlogPost } from "@/types/blogPostTypes";
import { HttpMethods } from "@/enums/httpMethods";
import { connectDb } from "@/lib/mongo/db";
import { ObjectId } from "bson";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) return res.status(405);

  const { db } = await connectDb();
  const id = req.query.id as string;

  if (id) {
    const blogPosts = await db
      .collection("BlogPost")
      .findOne({ _id: new ObjectId(id) });

    res.status(200);
    res.json(blogPosts);
    return;
  }
};
export default handler;
