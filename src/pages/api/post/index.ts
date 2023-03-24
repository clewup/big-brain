import type { NextApiRequest, NextApiResponse } from 'next';
import { BlogPostType } from '@/types';
import { HttpMethodsEnum } from '@/enums';
import { connectDb } from '@/lib/mongo/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectDb();

    switch (req.method) {
        case HttpMethodsEnum.POST:
            const blogPost = await db.collection('BlogPost').insertOne(req.body);

            res.status(201);
            return res.json(blogPost);

        case HttpMethodsEnum.GET:
            const blogPosts = await db.collection<BlogPostType>('BlogPost').find({}).toArray();

            res.status(200);
            return res.json(blogPosts);

        default:
            return res.status(405);
    }
};
export default handler;
