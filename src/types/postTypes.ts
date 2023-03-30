export interface PostType {
    id: number;
    user: number;
    title: string;
    image: string;
    content: string;
    date: string;
    tags: string[];
}

export type PostFormValues = Required<Omit<PostType, 'id'>>;
