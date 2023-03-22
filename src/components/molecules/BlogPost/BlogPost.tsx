import React from "react";
import styles from "./BlogPost.module.scss";
import Title from "@/components/molecules/BlogPost/components/Title/Title";
import Image from "@/components/molecules/BlogPost/components/Image/Image";
import Details from "@/components/molecules/BlogPost/components/Details/Details";
import { BlogPost } from "@/types/blogPostTypes";
import Tags from "@/components/molecules/BlogPost/components/Tags/Tags";
import { motion } from "framer-motion";

interface IProps {
  blogPost: BlogPost;
}

const BlogPost: React.FC<IProps> = ({ blogPost }) => {
  const { id, title, image, content, date, tags } = blogPost;

  return (
    <motion.div
      initial={{ y: "2.5rem", opacity: 0 }}
      whileInView={{ y: "0rem", opacity: 1 }}
      transition={{
        duration: 0.7,
        type: "spring",
        stiffness: 260,
        damping: 12,
      }}
      className={styles.blog_post}
      data-testid={`blogpost blogpost_${id}`}
    >
      <Title id={id} title={title} />
      <div className={styles.blog_post_content}>
        <Image imageUrl={image} />
        <Details content={content} date={date} />
      </div>
      <Tags tags={tags} />
    </motion.div>
  );
};
export default BlogPost;
