import PostForm from '@/components/organisms/PostForm/PostForm';
import usePost from '@/hooks/usePost/usePost';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './Create.module.scss';

const Create = () => {
    const [id, setId] = useState<number>();
    const router = useRouter();

    const { post, isLoading } = usePost(id);

    useEffect(() => {
        if (router.query.id && typeof router.query.id === 'string' && parseInt(router.query.id)) {
            setId(parseInt(router.query.id));
        }
    }, [router.query.id]);

    return (
        <div className={styles.create}>
            <PostForm post={post} isLoading={isLoading} />
        </div>
    );
};
export default Create;
