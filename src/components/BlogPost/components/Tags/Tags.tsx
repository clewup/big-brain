import styles from "./Tags.module.scss";
import { Tag, TagStyles } from "@/enums/tags";
import React from "react";

interface IProps {
  tags: Tag[];
}

const Tags: React.FC<IProps> = ({ tags }) => {
  return (
    <div className={styles.tags} data-testid={"blog_post_tags"}>
      {tags.map((tag) => {
        const tagColor = TagStyles[tag];
        return (
          <p key={tag} style={{ color: tagColor }}>
            #{tag}
          </p>
        );
      })}
    </div>
  );
};
export default Tags;
