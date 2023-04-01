import { PublicUserType, UserType } from '@/types/userTypes';
import { Comment, Post, Tag } from '@prisma/client';

export interface PostType {
    id: number;
    user: number;
    title: string;
    image: string;
    content: string;
    date: string;
    tags: string[];
    comments: CommentType[];
    likes: number;
}

export interface CommentType {
    id: number;
    user: PublicUserType;
    post: number;
    message: string;
    likes: number;
}

export type PostFormValues = Required<Omit<PostType, 'id'>>;
export type CommentFormValues = Required<Omit<CommentType, 'id' | 'user'>> & { user: UserType };
export type PostSearchFormValues = { search: string };

export type PostDto = (Post & { tags: Tag[]; comments: CommentDto[] }) | (Post & { tags: Tag[] });
export type CommentDto = Omit<Comment, 'user'> & { user: UserType };
