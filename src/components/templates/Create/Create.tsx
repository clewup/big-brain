import BlogPostForm from '@/components/organisms/BlogPostForm/BlogPostForm';
import React from 'react';
import styles from './Create.module.scss';

const Create = () => {
    return (
        <div className={styles.create}><BlogPostForm /></div>
    );
};
export default Create;
