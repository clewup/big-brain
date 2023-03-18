import styles from "./Post.module.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useBlogPost from "@/hooks/useBlogPost/useBlogPost";
import Image from "next/image";
import { TagStyles } from "@/enums/tags";
import Link from "next/link";
import { motion } from "framer-motion";

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
  const AnimatedImage = motion(Image);

  const { blogPost, isLoading, error } = useBlogPost({ id: id });

  if (isLoading) return null;
  if (!blogPost) return <p>Not found.</p>;
  if (error)
    return <p>Whoops! There's been a problem loading the blog posts.</p>;

  return (
    <div className={styles.post}>
      <h1>{blogPost.title}</h1>
      <div className={styles.main_body}>
        <div>
          <AnimatedImage
            src={blogPost.imageUrl}
            alt={blogPost.title}
            width={300}
            height={300}
            animate={{
              scale: [0.7, 1.05, 1.05, 1.05, 1],
              borderRadius: ["50%", "50%", "1rem", "1rem", "1rem"],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.3, 1],
            }}
            className={styles.image}
          />
          <p>{new Date(blogPost.date).toDateString()}</p>
          {blogPost.tags.map((tag) => {
            const tagColor = TagStyles[tag];
            return (
              <Link href={{ pathname: "posts", query: { category: tag } }}>
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  key={tag}
                  style={{ color: tagColor }}
                >
                  #{tag}
                </motion.p>
              </Link>
            );
          })}
        </div>
        <motion.p
          initial={{ y: "2.5rem", opacity: 0 }}
          whileInView={{ y: "0rem", opacity: 1 }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 260,
            damping: 12,
          }}
        >
          {blogPost.content}
        </motion.p>
      </div>
    </div>
  );
};
export default Post;
