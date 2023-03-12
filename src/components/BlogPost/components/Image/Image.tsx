import React from "react";
import styles from "./Image.module.scss";
import NextImage from "next/image";

interface IProps {
  imageUrl: string;
}

const Image: React.FC<IProps> = ({ imageUrl }) => {
  return (
    <div className={styles.image} data-testid={"blog_post_image"}>
      <NextImage
        src={imageUrl}
        alt={"Blog Post Image"}
        width={200}
        height={200}
      />
    </div>
  );
};
export default Image;
