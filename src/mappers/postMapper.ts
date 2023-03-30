import { PostType } from '@/types';
import { Post, Tag } from '@prisma/client';

const postMapper = (postEntity: Post & { tags: Tag[] }): PostType => {
    return {
        id: postEntity.id,
        customer: postEntity.customer,
        user: postEntity.user,
        image: postEntity.image,
        title: postEntity.title,
        content: postEntity.content,
        date: postEntity.createdAt,
        tags: postEntity.tags.map((tag) => tag.name),
    };
};

const postsMapper = (postEntities: (Post & { tags: Tag[] })[]): PostType[] => {
    return postEntities.map((postEntity) => postMapper(postEntity));
};

export { postMapper, postsMapper };
