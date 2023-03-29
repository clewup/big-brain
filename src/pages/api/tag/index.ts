import { HttpMethodsEnum } from '@/enums/httpMethodsEnum';
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== HttpMethodsEnum.GET) return res.status(405);

    let customer = req.headers['x-customer'];

        const tags = await prisma.tag.findMany({where: {customer: parseInt(customer as string)}});

        const tagNames: string[] = tags.map((tag) => tag.name);

        res.status(200);
        res.json(tagNames);
};
export default handler;
