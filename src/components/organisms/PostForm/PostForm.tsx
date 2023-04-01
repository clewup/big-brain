import { Inputs } from '@/components/atoms/Inputs/Inputs';
import FullPageLoader from '@/components/atoms/Loaders/components/FullPageLoader/FullPageLoader';
import ActionRow from '@/components/organisms/PostForm/components/ActionRow/ActionRow';
import validationSchema from '@/components/organisms/PostForm/utils/validationSchema';
import { useAuth } from '@/contexts/AuthContext';
import { RoutesEnum } from '@/enums';
import { slideLeft } from '@/lib/anim';
import postPost from '@/requests/postPost';
import { PostFormValues, PostType } from '@/types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Grid, IconButton } from '@mui/material';
import { Field, Form, Formik, FormikProps } from 'formik';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styles from './PostForm.module.scss';

interface IProps {
    post: PostType | undefined;
    isLoading: boolean;
}

const PostForm: React.FC<IProps> = ({ post, isLoading }) => {
    const formRef = useRef<FormikProps<PostFormValues>>(null);
    const [isHovering, setHovering] = useState(false);

    const { user } = useAuth();
    const router = useRouter();

    if (!user) return <></>;

    enum FormFields {
        TITLE = 'title',
        IMAGE = 'image',
        CONTENT = 'content',
        DATE = 'date',
        TAGS = 'tags',
    }

    const initialValues: PostFormValues = post || {
        user: user?.id,
        title: '',
        image: '',
        content: '',
        date: new Date().toISOString(),
        tags: ['nextjs'],
    };

    const handleSubmit = (values: PostFormValues) => {
        postPost(values);
        router.push({ pathname: RoutesEnum.POSTS });
    };

    const handleCancel = () => {
        formRef.current?.resetForm({ values: initialValues });
    };

    if ((isLoading || router.query.id) && !post) return <FullPageLoader />;

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
            innerRef={formRef}
            validationSchema={validationSchema}>
            {({ values, handleChange, setFieldValue, isSubmitting }) => {
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
                                <div className={styles.image_and_date_container}>
                                    <span className={styles.image_container}>
                                        {values.image ? (
                                            <div
                                                className={styles.uploaded_image}
                                                onMouseEnter={() => setHovering(true)}
                                                onMouseLeave={() => setHovering(false)}>
                                                {isHovering && (
                                                    <motion.div {...slideLeft}>
                                                        <IconButton
                                                            className={styles.clear_button}
                                                            onClick={() => setFieldValue(FormFields.IMAGE, '')}>
                                                            <HighlightOffIcon fontSize={'large'} />
                                                        </IconButton>
                                                    </motion.div>
                                                )}

                                                <Image
                                                    src={values.image}
                                                    alt={'image'}
                                                    height={250}
                                                    width={250}
                                                    className={styles.image}
                                                />
                                            </div>
                                        ) : (
                                            <Field
                                                name={FormFields.IMAGE}
                                                component={Inputs.UPLOAD}
                                                accept={'image/*'}
                                            />
                                        )}
                                    </span>

                                    <p>{new Date(values.date).toDateString()}</p>
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
                                <ActionRow onCancel={handleCancel} isSubmitting={isSubmitting} />
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};
export default PostForm;
