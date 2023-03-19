import React from "react";
import Header from "@/components/molecules/Layout/components/Header/Header";
import Footer from "@/components/molecules/Layout/components/Footer/Footer";
import styles from "./Layout.module.scss";

interface IProps {
  children: any;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.blog_content_root}>{children}</div>
      <Footer />
    </>
  );
};
export default Layout;
