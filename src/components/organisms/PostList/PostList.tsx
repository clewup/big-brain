import Post from '@/components/organisms/PostList/components/Post/Post';
import { PostType } from '@/types';
import React from 'react';
import styles from './PostList.module.scss';

interface IProps {
    posts: PostType[];
}

const PostList: React.FC<IProps> = ({ posts }) => {
    return (
        <div className={styles.post_list} data-testid={'post_list'}>
            {posts.map((post) => {
                return <Post key={post.id} post={post} />;
            })}
        </div>
    );
};
export default PostList;
