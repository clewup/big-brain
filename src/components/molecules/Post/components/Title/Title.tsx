import { RoutesEnum } from '@/enums';
import { PostType } from '@/types';
import Link from 'next/link';
import React from 'react';
import styles from './Title.module.scss';

type IProps = Pick<PostType, 'id' | 'title'>;

const Title: React.FC<IProps> = ({ id, title }) => {
    return (
        <div className={styles.title} data-testid={'post_title'}>
            <Link href={{ pathname: RoutesEnum.POST(id) }}>
                <p>{title}</p>
            </Link>
        </div>
    );
};
export default Title;
