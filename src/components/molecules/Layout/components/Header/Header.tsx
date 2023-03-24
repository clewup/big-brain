import styles from "./Header.module.scss";
import Link from "next/link";
import {
  Book as BookIcon,
  GitHub as GitHubIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { routes } from "@/enums/routes";

const Header = () => {
  const { theme, forcedTheme, setTheme } = useTheme();

  return (
    <div className={styles.header} data-testid={"header"}>
      <Link href={{ pathname: routes.HOME }} className={styles.logo}>
        <BookIcon />
        Blog
      </Link>
      <div className={styles.action_row}>
        <Link href={{ pathname: routes.POSTS }}>All Posts</Link>
        <Link href={{ pathname: routes.CATEGORIES }}>Categories</Link>
        <Link href={{ pathname: routes.HOME }}>
          <GitHubIcon />
        </Link>

        {theme === "light" ? (
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ rotate: -20, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <DarkModeIcon
              onClick={() => !forcedTheme && setTheme("dark")}
              className={styles.theme_toggle}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ rotate: 20, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <LightModeIcon
              onClick={() => !forcedTheme && setTheme("light")}
              className={styles.theme_toggle}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default Header;
