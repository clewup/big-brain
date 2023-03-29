import { HttpMethodsEnum } from '@/enums';
import prisma from '@/lib/prisma';
import { postMapper } from '@/mappers';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== HttpMethodsEnum.GET) return res.status(405);

    const id = req.query.id;

    if (id) {
        const post = await prisma.post.findFirst({
            include: {
                tags: true,
            },
            where: {
                id: parseInt(id as string),
            },
        });

        if (!post)
            return res.status(204)

        const mappedPost = postMapper(post);

        res.status(200);
        res.json(mappedPost);
        return;
    }
};
export default handler;
