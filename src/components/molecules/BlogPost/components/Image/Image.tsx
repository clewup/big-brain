import React from 'react';
import styles from './Image.module.scss';
import NextImage from 'next/image';
import { BlogPostType } from '@/types';

interface IProps extends Pick<BlogPostType, 'image'> {}

const Image: React.FC<IProps> = ({ image }) => {
    return (
        <NextImage
            src={image}
            alt={'Blog Post Image'}
            width={200}
            height={200}
            className={styles.image}
            data-testid={'blog_post_image'}
        />
    );
};
export default Image;
