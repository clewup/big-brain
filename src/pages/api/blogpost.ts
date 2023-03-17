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
  res: NextApiResponse<BlogPost[] | BlogPost | Response>
) {
  if (req.method != HttpMethods.GET) {
    res.status(405);
    res.send({ message: "Only GET requests are allowed." });
    return;
  }

  const { category, id } = req.query;

  if (category) {
    const blogPostsByCategory = blogPosts.filter((blogPost) =>
      blogPost.tags.find((tag) => tag === category)
    );

    if (!blogPostsByCategory || !blogPostsByCategory.length) {
      res.status(404);
      res.json({ message: "Not found." });
      return;
    }

    res.status(200);
    res.json(blogPostsByCategory);
  }

  if (id) {
    const blogPostById = blogPosts.find(
      (blogPost) => blogPost.id === Number(id)
    );

    if (!blogPostById) {
      res.status(404);
      res.json({ message: "Not found." });
      return;
    }

    res.status(200);
    res.json(blogPostById);
  }

  res.status(200);
  res.json(blogPosts);
}
