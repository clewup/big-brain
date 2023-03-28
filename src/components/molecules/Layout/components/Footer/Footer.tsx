import { useAuth } from '@/contexts/AuthContext';
import { UrlsEnum } from '@/enums';
import Link from 'next/link';
import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
   const {user, isLoggedIn, logout} = useAuth();

    return (
        <div className={styles.footer} data-testid={'footer'}>
            <p>clewup blog</p>
            {!user && !isLoggedIn ? (<Link href={UrlsEnum.AUTH}>
                Login
            </Link>) : (<>
                <p>{user?.email}</p>
                <a onClick={logout}>Logout</a>
            </>)}

        </div>
    );
};
export default Footer;
