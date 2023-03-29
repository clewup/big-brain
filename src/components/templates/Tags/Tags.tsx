import { useAuth } from '@/contexts/AuthContext';
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
    const {user} = useAuth();

    useEffect(() => {
        setLoading(true);
        getTags({ customer: user?.customer
    })
            .then(async (res) => setTags(await res.json()))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [user?.customer]);

    if (isLoading) return null;

    if (error) return <p>Whoops! There&apos;s been a problem loading the tags.</p>;

    return (
        <div className={styles.tags}>
            {tags.map((tag) => {
                return (
                    <Link key={tag} href={{ pathname: RoutesEnum.POSTS, query: { tag: tag } }}>
                        <motion.p whileHover={{ scale: 1.2 }}>
                            #{tag}
                        </motion.p>
                    </Link>
                );
            })}
        </div>
    );
};
export default Tags;
