import { HttpMethodsEnum } from '@/enums';
import prisma from '@/lib/prisma';
import { postsMapper } from '@/mappers';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== HttpMethodsEnum.GET) return res.status(405);

    const tag = req.query.tag;
    let customer = req.headers['x-customer'];

    if (tag) {
        const posts = await prisma.post.findMany({
            include: {
                tags: true,
            },
            where: {
                tags: {
                    some: {
                        name: tag as string,
                    },
                },
                customer: parseInt(customer as string),
            },
        });

        const mappedPosts = postsMapper(posts);

        res.status(200);
        return res.json(mappedPosts);
    }
};
export default handler;
