import React from "react";
import Header from "@/components/molecules/Layout/components/Header/Header";
import Footer from "@/components/molecules/Layout/components/Footer/Footer";

interface IProps {
  children: any;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
