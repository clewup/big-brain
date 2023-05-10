export type PostType = {
    title: string
    content: string
    image: string
    author: string
    date: string
    categories: string[]
    comments: CommentType[]
}

export type CreatePostType = {
    title: string
    content: string
    image: string
    categories: string[]
}

export type CommentType = {
    content: string
    author: string
    date: string
}
