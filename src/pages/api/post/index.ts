import { HttpMethodsEnum } from '@/enums';
import prisma from '@/lib/prisma';
import { postMapper, postsMapper } from '@/mappers';
import authMiddleware from '@/middleware/authMiddleware';
import { AuthorizedNextApiRequest } from '@/types';
import type { NextApiResponse } from 'next';

const handler = async (req: AuthorizedNextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case HttpMethodsEnum.POST:

            const post = await prisma.post.upsert({
                include: {
                    tags: true,
                },
                where: {id: req.body.id},
                update: {
                    title: req.body.title,
                    image: req.body.image,
                    content: req.body.content,
                    tags: {
                        connectOrCreate: req.body.tags.map((tag: string) => ({
                            where: { name: tag },
                            create: { name: tag},
                        })),
                    },
                },
                create: {
                    user: req.body.user,
                    title: req.body.title,
                    image: req.body.image,
                    content: req.body.content,
                    tags: {
                        connectOrCreate: req.body.tags.map((tag: string) => ({
                            where: { name: tag },
                            create: { name: tag },
                        })),
                    },
                }
            });

            const mappedPost = postMapper(post);

            res.status(201);
            return res.json(mappedPost);

        case HttpMethodsEnum.GET:
            const posts = await prisma.post.findMany({
                include: {
                    tags: true,
                },
            });

            const mappedPosts = postsMapper(posts);

            res.status(200);
            return res.json(mappedPosts);

        default:
            return res.status(405);
    }
};
export default authMiddleware(handler);
