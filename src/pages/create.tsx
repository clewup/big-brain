import Head from 'next/head';
import { Inter } from 'next/font/google';
import Template from '@/components/templates/Create/Create';

const inter = Inter({ subsets: ['latin'] });

const Create = () => {
    return (
        <>
            <Head>
                <title>Blog - Create</title>
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
export default Create;
