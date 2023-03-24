import BlogPost from '@/components/molecules/BlogPost/BlogPost';
import { BlogPostType } from '@/types';
import React from 'react';
import styles from './BlogPostList.module.scss';

interface IProps {
    blogPosts: BlogPostType[];
}

const BlogPostList: React.FC<IProps> = ({ blogPosts }) => {
    return (
        <div className={styles.blog_post_list} data-testid={'blogpost_list'}>
            {blogPosts.map((blogPost) => {
                return <BlogPost key={blogPost._id} blogPost={blogPost} />;
            })}
        </div>
    );
};
export default BlogPostList;
