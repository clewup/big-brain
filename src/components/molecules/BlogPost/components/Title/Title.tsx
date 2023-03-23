import React from "react";
import styles from "./Title.module.scss";
import Link from "next/link";
import { Routes } from "@/enums/routes";

interface IProps {
  _id: string;
  title: string;
}

const Title: React.FC<IProps> = ({ _id, title }) => {
  return (
    <div className={styles.title} data-testid={"blog_post_title"}>
      <Link href={{ pathname: Routes.POST(_id) }}>
        <p>{title}</p>
      </Link>
    </div>
  );
};
export default Title;
