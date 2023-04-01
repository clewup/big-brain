import { Errors } from '@/components/atoms/Errors/Errors';
import FullPageLoader from '@/components/atoms/Loaders/components/FullPageLoader/FullPageLoader';
import PostList from '@/components/organisms/PostList/PostList';
import SearchForm from '@/components/organisms/SearchForm/SearchForm';
import usePosts from '@/hooks/usePosts/usePosts';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './Posts.module.scss';

const Posts = () => {
    const router = useRouter();

    const { posts, isLoading, error } = usePosts({
        tag: router.query.tag,
        search: router.query.search,
    });

    if (isLoading) return <FullPageLoader />;
    if (error) return Errors.NotFound("There's been a problem loading the posts.");

    return (
        <div className={styles.posts}>
            <div className={styles.search_bar}>
                <SearchForm />
            </div>
            <PostList posts={posts} />
        </div>
    );
};
export default Posts;
