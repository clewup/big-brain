import { RoutesEnum } from '@/enums';
import { slideUp } from '@/lib/anim';
import { PostType } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './FullPost.module.scss';

interface IProps {
    post: PostType;
}

const FullPost: React.FC<IProps> = ({ post }) => {
    const AnimatedImage = motion(Image);

    return (
        <motion.div className={styles.full_post}>
            <h1>{post.title}</h1>

            <div className={styles.main_body}>
                <div>
                    <AnimatedImage
                        src={post.image}
                        alt={post.title}
                        width={300}
                        height={300}
                        animate={{
                            scale: [0.8, 1.05, 1],
                        }}
                        transition={{
                            duration: 0.7,
                            ease: 'easeInOut',
                        }}
                        className={styles.image}
                    />

                    <p>{new Date(post.date).toDateString()}</p>
                    {post.tags?.map((tag) => {
                        return (
                            <Link key={tag} href={{ pathname: RoutesEnum.POSTS, query: { tag: tag } }}>
                                <motion.p whileHover={{ scale: 1.1 }} key={tag}>
                                    #{tag}
                                </motion.p>
                            </Link>
                        );
                    })}
                </div>

                <motion.p {...slideUp}>{post.content}</motion.p>
            </div>
        </motion.div>
    );
};
export default FullPost;
