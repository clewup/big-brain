import * as Yup from 'yup';

export enum CommentFormFields {
    USER = 'user',
    POST = 'post',
    MESSAGE = 'message',
    LIKES = 'likes',
}

export const validationSchema = Yup.object().shape({
    [CommentFormFields.MESSAGE]: Yup.string()
        .min(5, 'Comment must be at least 5 characters')
        .max(250, 'Comment must be 250 characters or less')
        .required('Comment is required'),
});
