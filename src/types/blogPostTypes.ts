import { CategoriesEnum } from '@/enums';

export interface BlogPostType {
    _id: string;
    title: string;
    image: string;
    content: string;
    date: Date;
    tags: CategoriesEnum[];
}
