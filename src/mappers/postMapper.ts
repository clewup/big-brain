import { PostType } from '@/types';
import { CommentType } from '@/types/postTypes';
import { Comment, Post, Tag } from '@prisma/client';

type PostEntity = Post & { tags: Tag[]; comments: Comment[] };

const postMapper = (postEntity: PostEntity): PostType => {
    return {
        id: postEntity.id,
        user: postEntity.user,
        image: postEntity.image,
        title: postEntity.title,
        content: postEntity.content,
        date: postEntity.createdAt.toISOString(),
        tags: postEntity.tags.map((tag) => tag.name),
        comments: commentsMapper(postEntity.comments),
        likes: postEntity.likes,
    };
};

const postsMapper = (postEntities: PostEntity[]): PostType[] => {
    return postEntities.map((postEntity) => postMapper(postEntity));
};

const commentMapper = (commentEntity: Comment): CommentType => {
    return {
        id: commentEntity.id,
        user: commentEntity.user,
        post: commentEntity.postId,
        message: commentEntity.message,
        likes: commentEntity.likes,
    };
};

const commentsMapper = (commentEntities: Comment[]): CommentType[] => {
    return commentEntities.map((commentEntity) => commentMapper(commentEntity));
};

export { postMapper, postsMapper, commentMapper, commentsMapper };
