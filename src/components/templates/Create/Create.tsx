import PostForm from '@/components/organisms/PostForm/PostForm';
import React from 'react';
import styles from './Create.module.scss';

const Create = () => {
    return (
        <div className={styles.create}>
            <PostForm />
        </div>
    );
};
export default Create;
