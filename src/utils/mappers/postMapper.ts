import { PostType } from '@/types/postTypes'
import { Comment, Post } from '@prisma/client'

export default function postMapper(entity: Post & { comments: Comment[] }) {
    const mappedType: PostType = {
        author: entity.createdBy,
        categories: entity.categories,
        comments: entity.comments.map((comment) => {
            return {
                content: comment.content,
                author: comment.createdBy,
                date: comment.createdAt.toISOString(),
            }
        }),
        content: entity.content,
        date: entity.createdAt.toISOString(),
        image: entity.image,
        title: entity.title,
    }

    return mappedType
}

export function postsMapper(entities: (Post & { comments: Comment[] })[]) {
    return entities.map((entity) => postMapper(entity))
}
