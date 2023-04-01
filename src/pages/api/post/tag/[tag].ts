import { HttpMethodsEnum } from '@/enums';
import prisma from '@/lib/prisma';
import { postsMapper } from '@/mappers';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== HttpMethodsEnum.GET) return res.status(405);

    const tag = req.query.tag;

    if (!tag) {
        return res.status(400);
    }

    const posts = await prisma.post.findMany({
        include: {
            tags: true,
            comments: true,
        },
        where: {
            tags: {
                some: {
                    name: tag as string,
                },
            },
        },
    });

    const mappedPosts = postsMapper(posts);

    res.status(200);
    return res.json(mappedPosts);
};
export default handler;
