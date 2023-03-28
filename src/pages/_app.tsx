import Layout from '@/components/molecules/Layout/Layout';
import { AuthProvider } from '@/contexts/AuthContext';
import { VariantProvider } from '@/contexts/VariantContext';
import '@/styles/globals.scss';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <VariantProvider>

        <AuthProvider>
                <ThemeProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
        </AuthProvider>
        </VariantProvider>
            
    );
}
