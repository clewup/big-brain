import styles from "./Tags.module.scss";
import { Tag, TagStyles } from "@/enums/tags";
import React from "react";
import Link from "next/link";

interface IProps {
  tags: Tag[];
}

const Tags: React.FC<IProps> = ({ tags }) => {
  return (
    <div className={styles.tags} data-testid={"blog_post_tags"}>
      {tags.map((tag) => {
        const tagColor = TagStyles[tag];
        return (
          <Link href={{ pathname: "posts", query: { category: tag } }}>
            <p key={tag} style={{ color: tagColor }}>
              #{tag}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
export default Tags;
