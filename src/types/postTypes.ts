export interface PostType {
    id: number;
    customer: number;
    user: number;
    title: string;
    image: string;
    content: string;
    date: Date;
    tags: string[];
}

export type PostFormValues = Required<Omit<PostType, 'id'>>;
