import { useAuth } from '@/contexts/AuthContext';
import { RolesEnum, RoutesEnum } from '@/enums';
import {
    Book as BookIcon,
    DarkMode as DarkModeIcon,
    GitHub as GitHubIcon,
    LightMode as LightModeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
    const { theme, forcedTheme, setTheme } = useTheme();
    const { user } = useAuth();
    console.log(user);

    return (
        <div className={styles.header} data-testid={'header'}>
            <Link href={{ pathname: RoutesEnum.HOME }} className={styles.logo}>
                <BookIcon />
                Blog
            </Link>
            <div className={styles.action_row}>
                {user?.role === RolesEnum.ADMIN && <Link href={{ pathname: RoutesEnum.CREATE }}>Create</Link>}
                <Link href={{ pathname: RoutesEnum.POSTS }}>All Posts</Link>
                <Link href={{ pathname: RoutesEnum.TAGS }}>Tags</Link>
                <Link href={{ pathname: RoutesEnum.HOME }}>
                    <GitHubIcon />
                </Link>

                {theme === 'light' ? (
                    <motion.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ rotate: -20, scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                        }}
                    >
                        <DarkModeIcon
                            onClick={() => !forcedTheme && setTheme('dark')}
                            className={styles.theme_toggle}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ rotate: 20, scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                        }}
                    >
                        <LightModeIcon
                            onClick={() => !forcedTheme && setTheme('light')}
                            className={styles.theme_toggle}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
};
export default Header;
