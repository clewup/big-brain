import { EndpointsEnum, HttpMethodsEnum } from '@/enums';
import prisma from '@/lib/prisma';
import { commentMapper } from '@/mappers';
import authMiddleware from '@/middleware/authMiddleware';
import { AuthorizedNextApiRequest, UserType } from '@/types';
import type { NextApiResponse } from 'next';

const postHandler = async (req: AuthorizedNextApiRequest, res: NextApiResponse) => {
    const comment = await prisma.comment.create({
        data: {
            user: req.body.user.id,
            post: {
                connect: {
                    id: req.body.post,
                },
            },
            message: req.body.message,
        },
    });

    const userRes = await fetch(EndpointsEnum.USER_BY_ID(comment.user));
    const user: UserType = await userRes.json();

    res.status(201);
    res.json(commentMapper({ ...comment, user }));
    return;
};

const dynamicHandler = async (req: AuthorizedNextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case HttpMethodsEnum.POST:
            return authMiddleware(postHandler)(req, res);
        default:
            return res.status(405);
    }
};

export default dynamicHandler;
