import styles from "./Tags.module.scss";
import { Tag, TagStyles } from "@/enums/tags";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Routes } from "@/enums/routes";

interface IProps {
  tags: Tag[];
}

const Tags: React.FC<IProps> = ({ tags }) => {
  return (
    <div className={styles.tags} data-testid={"blog_post_tags"}>
      {tags.map((tag) => {
        const tagColor = TagStyles[tag];
        return (
          <Link href={{ pathname: Routes.POSTS, query: { category: tag } }}>
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
