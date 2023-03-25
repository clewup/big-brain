import styles from './Tags.module.scss';
import { CategoryStylesEnum, RoutesEnum } from '@/enums';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPostType } from '@/types';

type IProps = Pick<BlogPostType, 'tags'>

const Tags: React.FC<IProps> = ({ tags }) => {
    return (
        <div className={styles.tags} data-testid={'blog_post_tags'}>
            {tags.map((tag) => {
                const tagColor = CategoryStylesEnum[tag];
                return (
                    <Link key={tag} href={{ pathname: RoutesEnum.POSTS, query: { category: tag } }}>
                        <motion.p whileHover={{ scale: 1.1 }} key={tag} style={{ color: tagColor }}>
                            #{tag}
                        </motion.p>
                    </Link>
                );
            })}
        </div>
    );
};
export default Tags;
