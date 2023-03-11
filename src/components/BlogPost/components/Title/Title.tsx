import React from "react";
import styles from "./Title.module.scss";

interface IProps {
  title: string;
}

const Title: React.FC<IProps> = ({ title }) => {
  return (
    <div className={styles.title}>
      <p>{title}</p>
    </div>
  );
};
export default Title;
