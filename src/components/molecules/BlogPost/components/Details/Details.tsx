import React from 'react';
import styles from './Details.module.scss';
import { BlogPostType } from '@/types';

type IProps = Pick<BlogPostType, 'content' | 'date'>

const Details: React.FC<IProps> = ({ content, date }) => {
    const dateString = new Date(date).toDateString();

    return (
        <div className={styles.details} data-testid={'blog_post_details'}>
            <p>{content.length > 300 ? content.substring(0, 300) + '...' : content}</p>
            <p className={styles.date}>{dateString}</p>
        </div>
    );
};
export default Details;
