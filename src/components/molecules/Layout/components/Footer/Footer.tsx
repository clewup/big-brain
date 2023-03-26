import { RoutesEnum } from '@/enums';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
    const [clickCount, setClickCount] = useState(1);

    const router = useRouter();

    const handleTripleClick = () => {
        setClickCount(clickCount + 1);

        if (clickCount === 3) {
            router.push({ pathname: 'create' });
        }

        setTimeout(() => {
            setClickCount(0);
        }, 1000);
    };

    return (
        <div className={styles.footer} data-testid={'footer'}>
            <p>clewup blog</p>
            <Link href={{pathname: RoutesEnum.LOGIN}}>
                Login
            </Link>
        </div>
    );
};
export default Footer;
