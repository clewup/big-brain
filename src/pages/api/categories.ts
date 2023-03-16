import type { NextApiRequest, NextApiResponse } from "next";
import { mockBlogPosts } from "@/components/molecules/BlogPost/testUtils/mockData";
import { BlogPost } from "@/types/blogPost";
import { HttpMethods } from "@/enums/httpMethods";
import { mergeArrays } from "@/utils/arrays";
import { Tag } from "@/enums/tags";

const blogPosts = mockBlogPosts;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != HttpMethods.GET) {
    res.status(405);
    res.send({ message: "Only GET requests are allowed." });
    return;
  }

  const tags = blogPosts.map((blogPost) => {
    return blogPost.tags;
  });

  const data = mergeArrays(tags) as Tag[];

  res.status(200);
  res.json(data);
}
