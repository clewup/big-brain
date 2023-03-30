import { HttpMethodsEnum } from '@/enums';
import prisma from '@/lib/prisma';
import { postMapper } from '@/mappers';
import authMiddleware from '@/middleware/authMiddleware';
import { AuthorizedNextApiRequest } from '@/types';
import type { NextApiResponse } from 'next';

const handler = async (req: AuthorizedNextApiRequest, res: NextApiResponse) => {
    if (req.method !== HttpMethodsEnum.GET) return res.status(405);

    const id = req.query.id;

    if (!id) {
        return res.status(400);
    }

        const post = await prisma.post.findFirst({
            include: {
                tags: true,
            },
            where: {
                id: parseInt(id as string),
            },
        });

        if (!post) return res.status(204);

        const mappedPost = postMapper(post);

        res.status(200);
        res.json(mappedPost);
        return;
};
export default authMiddleware(handler);
