import Template from '@/components/templates/Categories/Categories';
import Head from 'next/head';
import React from 'react';


const Categories = () => {
    return (
        <>
            <Head>
                <title>Blog - Categories</title>
                <meta name="description" content="Blog portfolio piece" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Template />
            </main>
        </>
    );
};
export default Categories;