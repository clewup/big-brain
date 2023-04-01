import { CommentType } from '@/types/postTypes';
import React from 'react';
import styles from './Comment.module.scss';

interface IProps {
    comment: CommentType;
}

const Comment: React.FC<IProps> = ({ comment }) => {
    return <div className={styles.comment}>{comment.message}</div>;
};
export default Comment;
