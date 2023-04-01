import { CommentType } from '@/types/postTypes';
import Image from 'next/image';
import React from 'react';
import styles from './Comment.module.scss';

interface IProps {
    comment: CommentType;
}

const Comment: React.FC<IProps> = ({ comment }) => {
    return (
        <div className={styles.comment}>
            <div className={styles.comment_creator}>
                <Image
                    src={
                        'https://res.cloudinary.com/dliog6kq6/image/upload/v1680384159/blog/blank-profile-picture-973460_640_itlahz.png'
                    }
                    alt={'User Avatar'}
                    height={50}
                    width={50}
                />
                <p>{comment.user.email}</p>
            </div>
            <p>{comment.message}</p>
        </div>
    );
};
export default Comment;
