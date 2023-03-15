import styles from "./Posts.module.scss";
import BlogPostList from "@/components/organisms/BlogPostList/BlogPostList";
import { useRouter } from "next/router";
import useBlogPosts from "@/hooks/useBlogPosts/useBlogPosts";

const Posts = () => {
  const router = useRouter();

  const { blogPosts, isLoading, error } = useBlogPosts({
    category: router.query.category,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return <p>Whoops! There's been a problem loading the blog posts.</p>;

  return (
    <div className={styles.posts}>
      <BlogPostList blogPosts={blogPosts} />
    </div>
  );
};
export default Posts;
