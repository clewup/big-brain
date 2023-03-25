import BlogPostList from '@/components/organisms/BlogPostList/BlogPostList';
import useBlogPosts from '@/hooks/useBlogPosts/useBlogPosts';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './Posts.module.scss';

const Posts = () => {
    const router = useRouter();

    const { blogPosts, isLoading, error } = useBlogPosts({
        category: router.query.category,
    });

    if (isLoading) return null;
    if (error) return <p>Whoops! There&apos;s been a problem loading the blog posts.</p>;

    return (
        <div className={styles.posts}>
            <BlogPostList blogPosts={blogPosts} />
        </div>
    );
};
export default Posts;
