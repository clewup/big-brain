import { CategoriesEnum, CategoryStylesEnum, RoutesEnum } from '@/enums';
import getCategories from '@/requests/getCategories';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Categories.module.scss';

const Categories = () => {
    const [categories, setCategories] = useState<CategoriesEnum[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getCategories()
            .then(async (res) => setCategories(await res.json()))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    if (isLoading) return null;

    if (error) return <p>Whoops! There's been a problem loading the categories.</p>;

    return (
        <div className={styles.categories}>
            {categories.map((tag) => {
                const tagColor = CategoryStylesEnum[tag];
                return (
                    <Link href={{ pathname: RoutesEnum.POSTS, query: { category: tag } }}>
                        <motion.p whileHover={{ scale: 1.2 }} style={{ color: tagColor }}>
                            #{tag}
                        </motion.p>
                    </Link>
                );
            })}
        </div>
    );
};
export default Categories;
