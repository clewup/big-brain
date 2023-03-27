import { UrlsEnum } from '@/enums';
import Link from 'next/link';
import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <div className={styles.footer} data-testid={'footer'}>
            <p>clewup blog</p>
            <Link href={UrlsEnum.AUTH}>
                Login
            </Link>
        </div>
    );
};
export default Footer;
