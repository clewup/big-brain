import React, { useEffect, useState } from "react";
import { BlogPost } from "@/types/blogPostTypes";
import { endpoints } from "@/enums/endpoints";
import { HttpMethods } from "@/enums/httpMethods";

interface IProps {
  id?: string;
}

const useBlogPost = ({ id }: IProps) => {
  const [blogPost, setBlogPost] = useState<BlogPost>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogPost = (id: string) => {
    setLoading(true);

    fetch(endpoints.POST_BY_ID(id), {
      method: HttpMethods.GET,
    })
      .then(async (res) => setBlogPost(await res.json()))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchBlogPost(id);
    }
  }, [id]);

  return { blogPost, isLoading, error };
};
export default useBlogPost;
