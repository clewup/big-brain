import Head from "next/head";
import styles from "@/styles/Posts.module.scss";
import BlogPostList from "@/components/BlogPostList/BlogPostList";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blogPost";
import { Endpoints } from "@/enums/endpoints";
import { useRouter } from "next/router";

const Posts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

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

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return <p>Whoops! There's been a problem loading the blog posts.</p>;

  return (
    <>
      <Head>
        <title>Blog - Posts</title>
        <meta name="description" content="Blog portfolio piece" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <BlogPostList blogPosts={blogPosts} />
      </main>
    </>
  );
};
export default Posts;
