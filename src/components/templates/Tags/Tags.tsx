import FullPageLoader from '@/components/atoms/Loaders/components/FullPageLoader/FullPageLoader';
import { RoutesEnum } from '@/enums';
import getTags from '@/requests/getTags';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './Tags.module.scss';

const Tags = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getTags()
            .then(async (res) => setTags(await res.json()))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    if (isLoading) return <FullPageLoader />;
    if (error) return <p>Whoops! There&apos;s been a problem loading the tags.</p>;

    return (
        <motion.div
            className={styles.tags}
            initial={{}}
            animate={{
                transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                },
            }}>
            {tags.map((tag) => {
                return (
                    <motion.div key={tag} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Link href={{ pathname: RoutesEnum.POSTS, query: { tag: tag } }}>
                            <motion.p whileHover={{ scale: 1.2 }}>#{tag}</motion.p>
                        </Link>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};
export default Tags;
