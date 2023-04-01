import { Errors } from '@/components/atoms/Errors/Errors';
import FullPageLoader from '@/components/atoms/Loaders/components/FullPageLoader/FullPageLoader';
import FullPost from '@/components/molecules/FullPost/FullPost';
import CommentsList from '@/components/organisms/CommentsList/CommentsList';
import usePost from '@/hooks/usePost/usePost';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './Post.module.scss';

const Post = () => {
    const [id, setId] = useState<number>();
    const router = useRouter();

    useEffect(() => {
        if (router.query.id && typeof router.query.id === 'string' && parseInt(router.query.id)) {
            setId(parseInt(router.query.id));
        }
    }, [router.query.id]);

    const { post, isLoading, error } = usePost(id);

    if (isLoading) return <FullPageLoader />;
    if (!post) return <p>Not found.</p>;
    if (error) return Errors.NotFound("There's been a problem loading the post.");

    return (
        <div className={styles.post}>
            <FullPost post={post} />
            <CommentsList post={post} />
        </div>
    );
};
export default Post;
