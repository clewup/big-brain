import { RoutesEnum } from '@/enums';
import usePost from '@/hooks/usePost/usePost';
import { slideUp } from '@/lib/anim';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './Post.module.scss';

const Post = () => {
    const [id, setId] = useState<number>();
    const router = useRouter();

    useEffect(() => {
        if (router.query.id && typeof router.query.id === 'string' && parseInt(router.query.id)) {
            setId(parseInt(router.query.id));
        }
    }, [router.query.id]);

    const AnimatedImage = motion(Image);

    const { post, isLoading, error } = usePost(id);

    if (isLoading) return null;
    if (!post) return <p>Not found.</p>;
    if (error) return <p>Whoops! There&apos;s been a problem loading the blog posts.</p>;

    return (
        <motion.div className={styles.post}>
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
export default Post;
