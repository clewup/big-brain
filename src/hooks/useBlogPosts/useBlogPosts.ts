import { Endpoints } from "@/enums/endpoints";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blogPost";
import { HttpMethods } from "@/enums/httpMethods";

interface IProps {
  category?: string | string[];
}

const useBlogPosts = ({ category }: IProps) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogPosts = async () => {
    setLoading(true);

    fetch(Endpoints.BLOG_POST, {
      method: HttpMethods.GET,
    })
      .then(async (res) => setBlogPosts(await res.json()))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const fetchBlogPostsByCategory = async (category: string) => {
    setLoading(true);

    fetch(Endpoints.BLOG_POST_BY_CATEGORY(category), {
      method: HttpMethods.GET,
    })
      .then(async (res) => setBlogPosts(await res.json()))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (category && typeof category === "string") {
      fetchBlogPostsByCategory(category);
    } else {
      fetchBlogPosts();
    }
  }, [category]);

  return { blogPosts, isLoading, error };
};
export default useBlogPosts;
