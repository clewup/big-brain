import Details from '@/components/organisms/PostList/components/Post/components/Details/Details';
import Image from '@/components/organisms/PostList/components/Post/components/Image/Image';
import Tags from '@/components/organisms/PostList/components/Post/components/Tags/Tags';
import Title from '@/components/organisms/PostList/components/Post/components/Title/Title';
import { useAuth } from '@/contexts/AuthContext';
import { RolesEnum, RoutesEnum } from '@/enums';
import { slideLeft, slideUp } from '@/lib/anim';
import { PostType } from '@/types';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './Post.module.scss';

interface IProps {
    post: PostType;
}

const Post: React.FC<IProps> = ({ post }) => {
    const { id, title, image, content, date, tags } = post;

    const [isHovering, setHovering] = useState(false);

    const { user } = useAuth();
    const router = useRouter();

    return (
        <motion.div
            {...slideUp}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={styles.post}
            data-testid={`post post${id}`}>
            {isHovering && (
                <motion.div className={styles.action_row} {...slideLeft}>
                    {user?.role === RolesEnum.ADMIN && (
                        <IconButton
                            className={styles.edit_button}
                            onClick={() => router.push({ pathname: RoutesEnum.CREATE, query: { id: id } })}>
                            <EditIcon />
                        </IconButton>
                    )}
                    <IconButton
                        className={styles.open_button}
                        onClick={() => router.push({ pathname: RoutesEnum.POST(id) })}>
                        <OpenInNewIcon />
                    </IconButton>
                </motion.div>
            )}

            <Title id={id} title={title} />
            <div className={styles.post_content}>
                <Image image={image} />
                <Details content={content} date={date} />
            </div>
            <Tags tags={tags} />
        </motion.div>
    );
};
export default Post;
