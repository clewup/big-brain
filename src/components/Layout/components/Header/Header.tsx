import styles from "./Header.module.scss";
import Link from "next/link";
import {
  Book as BookIcon,
  GitHub as GitHubIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.header} data-testid={"header"}>
      <Link href={"/"} className={styles.logo}>
        <BookIcon />
        Blog
      </Link>
      <div className={styles.action_row}>
        <Link href={"/posts"}>All Posts</Link>
        <Link href={"/"}>Categories</Link>
        <Link href={"/"}>
          <GitHubIcon />
        </Link>
        {theme === "light" ? (
          <DarkModeIcon
            onClick={() => setTheme("dark")}
            className={styles.theme_toggle}
          />
        ) : (
          <LightModeIcon
            onClick={() => setTheme("light")}
            className={styles.theme_toggle}
          />
        )}
      </div>
    </div>
  );
};
export default Header;
