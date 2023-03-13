import type { NextApiRequest, NextApiResponse } from "next";
import { mockBlogPosts } from "@/components/BlogPost/testUtils/mockData";
import { BlogPost } from "@/types/blogPost";

const blogPosts = mockBlogPosts;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogPost[]>
) {
  res.status(200);
  res.json(blogPosts);
}
