import React from "react";
import styles from "./BlogPost.module.scss";
import Title from "@/components/BlogPost/components/Title/Title";
import Image from "@/components/BlogPost/components/Image/Image";
import Details from "@/components/BlogPost/components/Details/Details";
import { BlogPost } from "@/types/blogPost";

interface IProps {
  blogPost: BlogPost;
}

const BlogPost: React.FC<IProps> = ({ blogPost }) => {
  const { title, imageUrl, content, date } = blogPost;

  return (
    <div className={styles.blog_post}>
      <Title title={title} />
      <div className={styles.blog_post_content}>
        <Image imageUrl={imageUrl} />
        <Details content={content} date={date} />
      </div>
    </div>
  );
};
export default BlogPost;
