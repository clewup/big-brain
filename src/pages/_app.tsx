import FullPageLoader from '@/components/atoms/Loaders/components/FullPageLoader/FullPageLoader';
import Layout from '@/components/molecules/Layout/Layout';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.scss';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Layout>
                    <>
                        <FullPageLoader />
                        <Component {...pageProps} />
                    </>
                </Layout>
            </ThemeProvider>
        </AuthProvider>
    );
}
