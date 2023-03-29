import Details from '@/components/molecules/Post/components/Details/Details';
import Image from '@/components/molecules/Post/components/Image/Image';
import Tags from '@/components/molecules/Post/components/Tags/Tags';
import Title from '@/components/molecules/Post/components/Title/Title';
import { PostType } from '@/types';
import { motion } from 'framer-motion';
import React from 'react';
import styles from './Post.module.scss';

interface IProps {
    post: PostType;
}

const Post: React.FC<IProps> = ({ post }) => {
    const { id, title, image, content, date, tags } = post;

    return (
        <motion.div
            initial={{ y: '2.5rem', opacity: 0 }}
            whileInView={{ y: '0rem', opacity: 1 }}
            transition={{
                duration: 0.7,
                type: 'spring',
                stiffness: 260,
                damping: 12,
            }}
            className={styles.post}
            data-testid={`post post${id}`}
        >
            <Title id={id} title={title} />
            <div className={styles.post_content}>
                <Image image={image} />
                <Details content={content} date={date} />
            </div>
            <Tags tags={tags} />
        </motion.div>
    );
};
export default Post;
