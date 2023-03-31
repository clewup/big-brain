import PostForm from '@/components/organisms/PostForm/PostForm';
import usePost from '@/hooks/usePost/usePost';
import { SlideY } from '@/lib/anim';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './Create.module.scss';

const Create = () => {
    const [id, setId] = useState<number>();
    const router = useRouter();

    const { post, isLoading, error } = usePost(id);

    useEffect(() => {
        if (router.query.id && typeof router.query.id === 'string' && parseInt(router.query.id)) {
            setId(parseInt(router.query.id));
        }
    }, [router.query.id]);

    return (
        <div className={styles.create}>
            <SlideY direction={"up"} distance={100}>
                <PostForm post={post} isLoading={isLoading} />
            </SlideY>
        </div>
    );
};
export default Create;
