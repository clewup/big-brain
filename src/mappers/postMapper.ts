import { publicUserMapper } from '@/mappers/userMapper';
import { CommentDto, PostDto, PostType } from '@/types';
import { CommentType } from '@/types/postTypes';

const postMapper = (postDto: PostDto): PostType => {
    const comments = 'comments' in postDto ? commentsMapper(postDto.comments) : [];

    const post: PostType = {
        id: postDto.id,
        user: postDto.user,
        image: postDto.image,
        title: postDto.title,
        content: postDto.content,
        date: postDto.createdAt.toISOString(),
        tags: postDto.tags.map((tag) => tag.name),
        comments,
        likes: postDto.likes,
    };

    return post;
};

const postsMapper = (postDtos: PostDto[]): PostType[] => {
    return postDtos.map((postDto) => postMapper(postDto));
};

const commentMapper = (commentDto: CommentDto): CommentType => {
    return {
        id: commentDto.id,
        user: publicUserMapper(commentDto.user),
        post: commentDto.postId,
        message: commentDto.message,
        likes: commentDto.likes,
    };
};

const commentsMapper = (commentDtos: CommentDto[]): CommentType[] => {
    return commentDtos.map((commentDto) => commentMapper(commentDto));
};

export { postMapper, postsMapper, commentMapper, commentsMapper };
