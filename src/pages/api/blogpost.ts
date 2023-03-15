import type { NextApiRequest, NextApiResponse } from "next";
import { mockBlogPosts } from "@/components/molecules/BlogPost/testUtils/mockData";
import { BlogPost } from "@/types/blogPost";
import { HttpMethods } from "@/enums/httpMethods";

const blogPosts = mockBlogPosts;

interface Response {
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogPost[] | Response>
) {
  if (req.method != HttpMethods.GET) {
    res.status(405);
    res.send({ message: "Only GET requests are allowed." });
    return;
  }

  const { category } = req.query;

  let data = blogPosts;
  if (category)
    data = blogPosts.filter((blogPost) =>
      blogPost.tags.find((tag) => tag === category)
    );

  res.status(200);
  res.json(data);
}
