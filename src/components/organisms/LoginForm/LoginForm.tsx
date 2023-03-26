import { Inputs } from '@/components/atoms/Inputs/Inputs';
import validationSchema from '@/components/organisms/LoginForm/utils/validationSchema';
import { useAuth } from '@/contexts/AuthContext';
import { LoginFormValues } from '@/types';
import { Button, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
    const {login} = useAuth();

    enum FormFields {
        EMAIL = "email",
        PASSWORD = "password",
    }

    const initialValues: LoginFormValues = {
        email: "",
        password: "",
    }

    const handleSubmit = (values: LoginFormValues) => {
        login(values);
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({values, handleChange}) => {
                return (
                    <Form className={styles.form} data-testid={"login_form"}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    name={FormFields.EMAIL}
                                    component={Inputs.TEXT}
                                    onChange={handleChange}
                                    value={values.email}
                                    label={'Email'}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Field
                                    name={FormFields.PASSWORD}
                                    component={Inputs.TEXT}
                                    onChange={handleChange}
                                    value={values.password}
                                    label={'Password'}
                                    type={"password"}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <div className={styles.action_row}>
                                    <Button type={"button"} color={"success"} variant={"contained"}>
                                        Login
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}
export default LoginForm;