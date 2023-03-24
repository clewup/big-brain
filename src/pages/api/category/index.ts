import type { NextApiRequest, NextApiResponse } from "next";
import { mockBlogPosts } from "@/components/molecules/BlogPost/testUtils/mockData";
import { BlogPost } from "@/types/blogPostTypes";
import { HttpMethods } from "@/enums/httpMethods";
import { mergeArrays } from "@/utils/arrays";
import { Category } from "@/enums/categories";

const blogPosts = mockBlogPosts;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== HttpMethods.GET) return res.status(405);

  const tags = blogPosts.map((blogPost) => {
    return blogPost.tags;
  });

  const data = mergeArrays(tags) as Category[];

  res.status(200);
  res.json(data);
}
