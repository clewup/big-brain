import { EndpointsEnum, HttpMethodsEnum } from '@/enums';
import prisma from '@/lib/prisma';
import { postMapper } from '@/mappers';
import { CommentDto, UserType } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== HttpMethodsEnum.GET) return res.status(405);

    const id = req.query.id;

    if (!id) {
        return res.status(400);
    }

    const post = await prisma.post.findFirst({
        include: {
            tags: true,
            comments: true,
        },
        where: {
            id: parseInt(id as string),
        },
    });

    if (!post) return res.status(204);

    const comments: CommentDto[] = [];

    for (const comment of post.comments) {
        const userRes = await fetch(EndpointsEnum.USER_BY_ID(comment.user));
        const user: UserType = await userRes.json();

        comments.push({
            id: comment.id,
            user: user,
            postId: comment.postId,
            message: comment.message,
            likes: comment.likes,
        });
    }

    const mappedPost = postMapper({ ...post, comments: comments });

    res.status(200);
    res.json(mappedPost);
    return;
};
export default handler;
