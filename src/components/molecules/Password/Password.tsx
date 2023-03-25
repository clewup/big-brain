import { Inputs } from '@/components/atoms/Inputs/Inputs';
import { Button } from '@mui/material';
import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik';
import React from 'react';
import styles from './Password.module.scss';

interface IProps {
    handleSignIn: (password: string) => boolean;
}

const Password: React.FC<IProps> = ({ handleSignIn }) => {
    const initialValues = {
        password: '',
    };

    const handleSubmit = (values: FormikValues, helpers: FormikHelpers<{ password: string }>) => {
        const isSignedIn = handleSignIn(values.password);

        if (!isSignedIn) helpers.setFieldError('password', 'Incorrect password');
    };

    return (
        <Formik initialValues={initialValues} onSubmit={(values, helpers) => handleSubmit(values, helpers)}>
            {({ values, handleChange }) => {
                return (
                    <Form className={styles.password}>
                        <p>Please check your emails for the password.</p>
                        <span>
                            <Field
                                name={'password'}
                                component={Inputs.TEXT}
                                onChange={handleChange}
                                value={values.password}
                                type={'password'}
                            />
                            <Button type={'submit'}>Sign In</Button>
                        </span>
                    </Form>
                );
            }}
        </Formik>
    );
};
export default Password;
