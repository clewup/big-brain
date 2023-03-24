import type { NextApiRequest, NextApiResponse } from 'next';
import { mockBlogPosts } from '@/components/molecules/BlogPost/testUtils/mockData';
import { HttpMethodsEnum } from '@/enums/httpMethodsEnum';
import { mergeArrays } from '@/utils';
import { CategoriesEnum } from '@/enums';

const blogPosts = mockBlogPosts;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== HttpMethodsEnum.GET) return res.status(405);

    const tags = blogPosts.map((blogPost) => {
        return blogPost.tags;
    });

    const data = mergeArrays(tags) as CategoriesEnum[];

    res.status(200);
    res.json(data);
}
