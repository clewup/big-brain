import styles from "./Tags.module.scss";
import { Category, CategoryStyle } from "@/enums/categories";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { routes } from "@/enums/routes";
import { BlogPost } from "@/types/blogPostTypes";

interface IProps extends Pick<BlogPost, "tags"> {}

const Tags: React.FC<IProps> = ({ tags }) => {
  return (
    <div className={styles.tags} data-testid={"blog_post_tags"}>
      {tags.map((tag) => {
        const tagColor = CategoryStyle[tag];
        return (
          <Link href={{ pathname: routes.POSTS, query: { category: tag } }}>
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
  );
};
export default Tags;
