export type PostType = {
    title: string
    content: string
    image: string
    categories: string[]
    comments: CommentType[]
}

export type CommentType = {
    content: string
}
