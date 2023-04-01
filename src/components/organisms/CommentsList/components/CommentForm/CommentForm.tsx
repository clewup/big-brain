import { Errors } from '@/components/atoms/Errors/Errors';
import { Inputs } from '@/components/atoms/Inputs/Inputs';
import { useAuth } from '@/contexts/AuthContext';
import postComment from '@/requests/postComment';
import { CommentFormValues, CommentType, PostType } from '@/types/postTypes';
import { Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { SetStateAction } from 'react';

interface IProps {
    post: PostType;
    setComments: React.Dispatch<SetStateAction<CommentType[]>>;
}

const CommentForm: React.FC<IProps> = ({ post, setComments }) => {
    const { user } = useAuth();

    if (!user) return Errors.SignIn('to leave a comment');

    enum FormFields {
        MESSAGE = 'message',
    }

    const initialValues: CommentFormValues = {
        user: user,
        post: post.id,
        message: '',
        likes: 0,
    };

    const handleSubmit = (values: CommentFormValues) => {
        postComment(values).then(async (res) => {
            const data = await res.json();
            setComments((prev) => {
                return [...prev, data];
            });
        });
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange }) => {
                return (
                    <Form>
                        <Field
                            name={FormFields.MESSAGE}
                            component={Inputs.TEXT_AREA}
                            onChange={handleChange}
                            value={values.message}
                            rows={3}
                            label={'Leave a Comment'}
                        />

                        <Button type={'submit'} variant={'contained'} color={'success'}>
                            Comment
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
export default CommentForm;
