import { CategoryStylesEnum, RoutesEnum } from '@/enums';
import useBlogPost from '@/hooks/useBlogPost/useBlogPost';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './Post.module.scss';

const Post = () => {
    const [id, setId] = useState<string>();
    const router = useRouter();

    useEffect(() => {
        if (router.query.id && typeof router.query.id === 'string') {
            setId(router.query.id);
        }
    }, [router.query.id]);

    const AnimatedImage = motion(Image);

    const { blogPost, isLoading, error } = useBlogPost({ id: id });

    if (isLoading) return null;
    if (!blogPost) return <p>Not found.</p>;
    if (error) return <p>Whoops! There&apos;s been a problem loading the blog posts.</p>;

    return (
        <div className={styles.post}>
            <h1>{blogPost.title}</h1>

            <div className={styles.main_body}>
                <div>
                    <AnimatedImage
                        src={blogPost.image}
                        alt={blogPost.title}
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

                    <p>{new Date(blogPost.date).toDateString()}</p>
                    {blogPost.tags?.map((tag) => {
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

                <motion.p
                    initial={{ y: '2.5rem', opacity: 0 }}
                    whileInView={{ y: '0rem', opacity: 1 }}
                    transition={{
                        duration: 1,
                        type: 'spring',
                        stiffness: 100,
                        damping: 12,
                        delay: 0.6,
                    }}
                >
                    {blogPost.content}
                </motion.p>
            </div>
        </div>
    );
};
export default Post;
