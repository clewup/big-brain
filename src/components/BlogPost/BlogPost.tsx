import React from "react";
import styles from "./BlogPost.module.scss";
import Title from "@/components/BlogPost/components/Title/Title";
import Image from "@/components/BlogPost/components/Image/Image";
import Details from "@/components/BlogPost/components/Details/Details";
import { BlogPost } from "@/types/blogPost";
import Tags from "@/components/BlogPost/components/Tags/Tags";

interface IProps {
  blogPost: BlogPost;
}

const BlogPost: React.FC<IProps> = ({ blogPost }) => {
  const { id, title, imageUrl, content, date, tags } = blogPost;

  return (
    <div className={styles.blog_post} data-testid={`blogpost blogpost_${id}`}>
      <Title title={title} />
      <div className={styles.blog_post_content}>
        <Image imageUrl={imageUrl} />
        <Details content={content} date={date} />
      </div>
      <Tags tags={tags} />
    </div>
  );
};
export default BlogPost;
