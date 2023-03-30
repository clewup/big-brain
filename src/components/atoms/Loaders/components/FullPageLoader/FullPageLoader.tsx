import Router from 'next/router';
import { useEffect, useState } from 'react';
import { TailSpin as Loader } from 'react-loader-spinner';
import styles from './FullPageLoader.module.scss';

const FullPageLoader = () => {
    const [loading, setLoading] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const startLoading = () => {
            setLoading(true);
            setTimeout(() => setShowLoader(true), 1000);
        };
        const endLoading = () => {
            setLoading(false);
            setShowLoader(false);
        };

        Router.events.on('routeChangeStart', startLoading);
        Router.events.on('routeChangeComplete', endLoading);
        Router.events.on('routeChangeError', endLoading);

        return () => {
            Router.events.off('routeChangeStart', startLoading);
            Router.events.off('routeChangeComplete', endLoading);
            Router.events.off('routeChangeError', endLoading);
        };
    }, []);

    return (
        <div className={`${styles.full_page_loader} ${loading && showLoader ? styles.show : ''}`}>
            <Loader color="#ffffff" height={80} width={80} />
        </div>
    );
};

export default FullPageLoader;
