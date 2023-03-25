import Footer from '@/components/molecules/Layout/components/Footer/Footer';
import Header from '@/components/molecules/Layout/components/Header/Header';
import React from 'react';
import styles from './Layout.module.scss';

interface IProps {
    children: JSX.Element;
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
