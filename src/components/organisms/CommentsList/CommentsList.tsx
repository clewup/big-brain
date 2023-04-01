import Comment from '@/components/organisms/CommentsList/components/Comment/Comment';
import CommentForm from '@/components/organisms/CommentsList/components/CommentForm/CommentForm';
import { PostType } from '@/types/postTypes';
import React, { useState } from 'react';
import styles from './CommentsList.module.scss';

interface IProps {
    post: PostType;
}

const CommentsList: React.FC<IProps> = ({ post }) => {
    const [comments, setComments] = useState(post.comments);

    return (
        <div className={styles.comments_list}>
            <div className={styles.add_comment}>
                <h1>Comments</h1>
                <CommentForm post={post} setComments={setComments} />
            </div>

            {comments?.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
            })}
        </div>
    );
};
export default CommentsList;
