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
    user: number;
    post: number;
    message: string;
    likes: number;
}

export type PostFormValues = Required<Omit<PostType, 'id'>>;
export type CommentFormValues = Required<Omit<CommentType, 'id'>>;
