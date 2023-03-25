import { CategoriesEnum } from '@/enums';

export interface BlogPostType {
    _id: string;
    title: string;
    image: string;
    content: string;
    date: Date;
    tags: CategoriesEnum[];
}

export type BlogPostFormValues = Required<Omit<BlogPostType, '_id'>>;
