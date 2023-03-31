import { PostType } from '@/types';
import React from 'react';
import styles from './Title.module.scss';

type IProps = Pick<PostType, 'id' | 'title'>;

const Title: React.FC<IProps> = ({ id, title }) => {
    return (
        <div className={styles.title} data-testid={'post_title'}>
            <p>{title}</p>
        </div>
    );
};
export default Title;
