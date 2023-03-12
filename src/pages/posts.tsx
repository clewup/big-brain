import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Posts.module.scss";
import BlogPostList from "@/components/BlogPostList/BlogPostList";
import { mockBlogPosts } from "@/components/BlogPost/testUtils/mockData";

const inter = Inter({ subsets: ["latin"] });

const Posts = () => {
  return (
    <>
      <Head>
        <title>Blog - Posts</title>
        <meta name="description" content="Blog portfolio piece" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <BlogPostList blogPosts={mockBlogPosts} />
      </main>
    </>
  );
};
export default Posts;
