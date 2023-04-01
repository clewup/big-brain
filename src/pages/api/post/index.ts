import { HttpMethodsEnum } from '@/enums';
import prisma from '@/lib/prisma';
import { postMapper, postsMapper } from '@/mappers';
import authMiddleware from '@/middleware/authMiddleware';
import { AuthorizedNextApiRequest } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

const postHandler = async (req: AuthorizedNextApiRequest, res: NextApiResponse) => {
    const post = await prisma.post.upsert({
        include: {
            tags: true,
        },
        where: { id: req.body.id || 0 },
        update: {
            title: req.body.title,
            image: req.body.image,
            content: req.body.content,
            tags: {
                connectOrCreate: req.body.tags.map((tag: string) => ({
                    where: { name: tag },
                    create: { name: tag },
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
        },
    });

    const mappedPost = postMapper(post);

    res.status(201);
    return res.json(mappedPost);
};

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const search = req.query.search;

    if (search && typeof search === 'string') {
        const posts = await prisma.post.findMany({
            include: {
                tags: true,
            },
            where: {
                title: {
                    contains: search,
                },
            },
        });

        const mappedPosts = postsMapper(posts);

        res.status(200);
        return res.json(mappedPosts);
    }

    const posts = await prisma.post.findMany({
        include: {
            tags: true,
        },
    });

    const mappedPosts = postsMapper(posts);

    res.status(200);
    return res.json(mappedPosts);
};

const dynamicHandler = async (req: AuthorizedNextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case HttpMethodsEnum.POST:
            return authMiddleware(postHandler)(req, res);
        case HttpMethodsEnum.GET:
            return getHandler(req, res);
        default:
            return res.status(405);
    }
};

export default dynamicHandler;
