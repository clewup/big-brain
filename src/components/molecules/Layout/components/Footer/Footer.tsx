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
            <div onMouseDown={handleTripleClick}>clewup blog</div>
        </div>
    );
};
export default Footer;
