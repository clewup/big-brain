import { Endpoints } from "@/enums/endpoints";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blogPost";

interface IProps {
  category?: string | string[];
}

const useBlogPosts = ({ category }: IProps) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogPosts = async () => {
    setLoading(true);

    fetch(Endpoints.BLOG_POST)
      .then(async (res) => setBlogPosts(await res.json()))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPostsByCategory = async (category: string) => {
    setLoading(true);

    fetch(Endpoints.BLOG_POST_BY_CATEGORY(category))
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
