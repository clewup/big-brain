import React from "react";
import styles from "./Details.module.scss";

interface IProps {
  content: string;
  date: Date;
}

const Details: React.FC<IProps> = ({ content, date }) => {
  return (
    <div className={styles.details} data-testid={"blog_post_details"}>
      <p>
        {content.length > 300 ? content.substring(0, 300) + "..." : content}
      </p>
      <p className={styles.date}>{date.toDateString()}</p>
    </div>
  );
};
export default Details;
