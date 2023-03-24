import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethodsEnum } from '@/enums';
import { connectDb } from '@/lib/mongo/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== HttpMethodsEnum.GET) return res.status(405);

    const { db } = await connectDb();
    const category = req.query.category as string;

    if (category) {
        const blogPosts = await db.collection('BlogPost').find({ category: category }).toArray();

        res.status(200);
        return res.json(blogPosts);
    }
};
export default handler;
