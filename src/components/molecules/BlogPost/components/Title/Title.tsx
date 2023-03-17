import React from "react";
import styles from "./Title.module.scss";
import Link from "next/link";

interface IProps {
  id: number;
  title: string;
}

const Title: React.FC<IProps> = ({ id, title }) => {
  return (
    <div className={styles.title} data-testid={"blog_post_title"}>
      <Link href={{ pathname: "post", query: { id: id } }}>
        <p>{title}</p>
      </Link>
    </div>
  );
};
export default Title;
