import { RoutesEnum } from '@/enums';
import { PostType } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import styles from './Tags.module.scss';

type IProps = Pick<PostType, 'tags'>;

const Tags: React.FC<IProps> = ({ tags }) => {
    return (
        <div className={styles.tags} data-testid={'post_tags'}>
            {tags.map((tag) => {
                return (
                    <Link key={tag} href={{ pathname: RoutesEnum.POSTS, query: { tag: tag } }}>
                        <motion.p whileHover={{ scale: 1.1 }} key={tag}>
                            #{tag}
                        </motion.p>
                    </Link>
                );
            })}
        </div>
    );
};
export default Tags;
