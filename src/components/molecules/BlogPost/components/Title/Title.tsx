import React from 'react';
import styles from './Title.module.scss';
import Link from 'next/link';
import { RoutesEnum } from '@/enums';
import { BlogPostType } from '@/types';

type IProps = Pick<BlogPostType, '_id' | 'title'>

const Title: React.FC<IProps> = ({ _id, title }) => {
    return (
        <div className={styles.title} data-testid={'blog_post_title'}>
            <Link href={{ pathname: RoutesEnum.POST(_id) }}>
                <p>{title}</p>
            </Link>
        </div>
    );
};
export default Title;
