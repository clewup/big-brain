import styles from "./BlogPostList.module.scss";
import BlogPost from "@/components/molecules/BlogPost/BlogPost";
import React from "react";

interface IProps {
  blogPosts: BlogPost[];
}

const BlogPostList: React.FC<IProps> = ({ blogPosts }) => {
  return (
    <div className={styles.blog_post_list} data-testid={"blogpost_list"}>
      {blogPosts.map((blogPost) => {
        return <BlogPost key={blogPost.id} blogPost={blogPost} />;
      })}
    </div>
  );
};
export default BlogPostList;
