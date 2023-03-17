import styles from "./Post.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useBlogPost from "@/hooks/useBlogPost/useBlogPost";

const Post = () => {
  const [id, setId] = useState<number>();

  useEffect(() => {
    if (
      router.query.id &&
      typeof router.query.id === "string" &&
      parseInt(router.query.id)
    ) {
      setId(parseInt(router.query.id));
    }
  }, []);

  const router = useRouter();

  const { blogPost, isLoading, error } = useBlogPost({ id: id });

  if (!blogPost) return <p>Not found.</p>;
  if (isLoading) return null;
  if (error)
    return <p>Whoops! There's been a problem loading the blog posts.</p>;

  console.log(blogPost);

  return (
    <div className={styles.post}>
      <p>{blogPost.title}</p>
      <p>{blogPost.content}</p>
      <p>{blogPost.date}</p>
    </div>
  );
};
export default Post;
