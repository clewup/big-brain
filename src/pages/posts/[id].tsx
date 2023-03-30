import Template from '@/components/templates/Post/Post';
import Head from 'next/head';
import React from 'react';

const Posts = () => {
    return (
        <>
            <Head>
                <title>Blog - Post </title>
                <meta name="description" content="Blog portfolio piece" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <main>
                <Template />
            </main>
        </>
    );
};
export default Posts;
