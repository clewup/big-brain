import styles from "./Header.module.scss";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import BookIcon from "@mui/icons-material/Book";

const Header = () => {
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
      </div>
    </div>
  );
};
export default Header;
