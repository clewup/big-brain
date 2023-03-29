import { PostType } from '@/types';
import NextImage from 'next/image';
import React from 'react';
import styles from './Image.module.scss';

type IProps = Pick<PostType, 'image'>;

const Image: React.FC<IProps> = ({ image }) => {
    return (
        <NextImage
            src={image}
            alt={'Blog Post Image'}
            width={200}
            height={200}
            className={styles.image}
            data-testid={'post_image'}
        />
    );
};
export default Image;
