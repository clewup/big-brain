import { HttpMethodsEnum } from '@/enums/httpMethodsEnum';
import prisma from '@/lib/prisma';
import authMiddleware from '@/middleware/authMiddleware';
import { AuthorizedNextApiRequest } from '@/types';
import type { NextApiResponse } from 'next';

const handler = async (req: AuthorizedNextApiRequest, res: NextApiResponse) => {
    if (req.method !== HttpMethodsEnum.GET) return res.status(405);

    const tags = await prisma.tag.findMany();

    const tagNames: string[] = tags.map((tag) => tag.name);

    res.status(200);
    res.json(tagNames);
};
export default authMiddleware(handler);
