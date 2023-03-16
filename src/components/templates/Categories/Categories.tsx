import { useEffect, useState } from "react";
import { Tag, TagStyles } from "@/enums/tags";
import styles from "./Categories.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";

const Categories = () => {
  const [categories, setCategories] = useState<Tag[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/categories")
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
        const tagColor = TagStyles[tag];
        return (
          <Link href={{ pathname: "posts", query: { category: tag } }}>
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
