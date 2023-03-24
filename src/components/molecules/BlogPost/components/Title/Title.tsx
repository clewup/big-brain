import React from "react";
import styles from "./Title.module.scss";
import Link from "next/link";
import { routes } from "@/enums/routes";
import { BlogPost } from "@/types/blogPostTypes";

interface IProps extends Pick<BlogPost, "_id" | "title"> {}

const Title: React.FC<IProps> = ({ _id, title }) => {
  return (
    <div className={styles.title} data-testid={"blog_post_title"}>
      <Link href={{ pathname: routes.POST(_id) }}>
        <p>{title}</p>
      </Link>
    </div>
  );
};
export default Title;
