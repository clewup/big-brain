import Details from '@/components/molecules/Post/components/Details/Details';
import Image from '@/components/molecules/Post/components/Image/Image';
import Tags from '@/components/molecules/Post/components/Tags/Tags';
import Title from '@/components/molecules/Post/components/Title/Title';
import { useAuth } from '@/contexts/AuthContext';
import { RolesEnum, RoutesEnum } from '@/enums';
import { SlideX } from '@/lib/anim';
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
            initial={{ y: '2.5rem', opacity: 0 }}
            whileInView={{ y: '0rem', opacity: 1 }}
            transition={{
                duration: 0.7,
                type: 'spring',
                stiffness: 260,
                damping: 12,
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={styles.post}
            data-testid={`post post${id}`}
        >
            {isHovering && (
                        <SlideX direction={"left"} distance={70} className={styles.action_row}>
                            <>
                                {user?.role === RolesEnum.ADMIN && (
                                    <IconButton
                                        className={styles.edit_button}
                                        onClick={() => router.push({ pathname: RoutesEnum.CREATE, query: { id: id } })}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                )}
                                <IconButton
                                    className={styles.open_button}
                                    onClick={() => router.push({ pathname: RoutesEnum.POST(id) })}
                                >
                                    <OpenInNewIcon />
                                </IconButton>
                            </>
                        </SlideX>
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
