import { Inputs } from '@/components/atoms/Inputs/Inputs';
import ActionRow from '@/components/organisms/PostForm/components/ActionRow/ActionRow';
import validationSchema from '@/components/organisms/PostForm/utils/validationSchema';
import { useAuth } from '@/contexts/AuthContext';
import postPost from '@/requests/postPost';
import { PostFormValues } from '@/types';
import { Grid } from '@mui/material';
import { Field, Form, Formik, FormikProps } from 'formik';
import Image from 'next/image';
import React, { useRef } from 'react';
import styles from './PostForm.module.scss';

const PostForm = () => {
    const formRef = useRef<FormikProps<PostFormValues>>(null);
    const { user } = useAuth();

    if (!user) return <></>;

    enum FormFields {
        TITLE = 'title',
        IMAGE = 'image',
        CONTENT = 'content',
        DATE = 'date',
        TAGS = 'tags',
    }

    const initialValues: PostFormValues = {
        customer: user?.customer,
        user: user?.id,
        title: '',
        image: '',
        content: '',
        date: new Date(),
        tags: ['nextjs'],
    };

    const handleSubmit = (values: PostFormValues) => {
        postPost(values);
    };

    const handleCancel = () => {
        formRef.current?.resetForm({ values: initialValues });
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
            innerRef={formRef}
            validationSchema={validationSchema}
        >
            {({ values, handleChange }) => {
                return (
                    <Form className={styles.form}>
                        <h1>Create/Edit a Blog Post</h1>
                        <br />

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    name={FormFields.TITLE}
                                    component={Inputs.TEXT}
                                    onChange={handleChange}
                                    value={values.title}
                                    label={'Title'}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <div className={styles.image_container}>
                                    <span className={styles.image_placeholder}>
                                        {values.image ? (
                                            <Image
                                                src={values.image}
                                                alt={'image'}
                                                height={250}
                                                width={250}
                                                className={styles.image}
                                            />
                                        ) : (
                                            <Field
                                                name={FormFields.IMAGE}
                                                component={Inputs.UPLOAD}
                                                accept={'image/*'}
                                            />
                                        )}
                                    </span>

                                    <p>{values.date.toDateString()}</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} md={7}>
                                <Field
                                    name={FormFields.CONTENT}
                                    component={Inputs.TEXT_AREA}
                                    onChange={handleChange}
                                    value={values.content}
                                    rows={20}
                                    label={'Content'}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {}
                                <ActionRow onCancel={handleCancel} />
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};
export default PostForm;
