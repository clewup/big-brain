import * as Yup from 'yup';

export enum PostFormFields {
    USER = 'user',
    TITLE = 'title',
    IMAGE = 'image',
    CONTENT = 'content',
    DATE = 'date',
    TAGS = 'tags',
    COMMENTS = 'comments',
    LIKES = 'likes',
}

export const validationSchema = Yup.object().shape({
    [PostFormFields.TITLE]: Yup.string().required('Title is required'),
    [PostFormFields.IMAGE]: Yup.string(),
    [PostFormFields.CONTENT]: Yup.string().required('Content is required'),
    [PostFormFields.DATE]: Yup.date().required('Date is required'),
    [PostFormFields.TAGS]: Yup.array().of(Yup.string()).min(1, 'At least one tag is required'),
});
