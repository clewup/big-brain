import { useEffect, useState } from "react";
import { Category, CategoryStyle } from "@/enums/categories";
import styles from "./Categories.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";
import { endpoints } from "@/enums/endpoints";
import { routes } from "@/enums/routes";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(endpoints.CATEGORY)
      .then(async (res) => setCategories(await res.json()))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) return null;

  if (error)
    return <p>Whoops! There's been a problem loading the categories.</p>;

  return (
    <div className={styles.categories}>
      {categories.map((tag) => {
        const tagColor = CategoryStyle[tag];
        return (
          <Link href={{ pathname: routes.POSTS, query: { category: tag } }}>
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
