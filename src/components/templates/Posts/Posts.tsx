import PostList from '@/components/organisms/PostList/PostList';
import usePosts from '@/hooks/usePosts/usePosts';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './Posts.module.scss';

const Posts = () => {
    const router = useRouter();

    const { posts, isLoading, error } = usePosts({
        tag: router.query.tag,
    });

    if (isLoading) return null;
    if (error) return <p>Whoops! There&apos;s been a problem loading the blog posts.</p>;

    return (
        <div className={styles.posts}>
            <PostList posts={posts} />
        </div>
    );
};
export default Posts;
