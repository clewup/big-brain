import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
    return (
        <>
            <Head>
                <title>Blog</title>
                <meta name="description" content="Blog portfolio piece" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main></main>
        </>
    );
};
export default Home;
