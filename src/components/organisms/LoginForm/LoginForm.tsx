import { Inputs } from '@/components/atoms/Inputs/Inputs';
import validationSchema from '@/components/organisms/LoginForm/utils/validationSchema';
import { useAuth } from '@/contexts/AuthContext';
import { RoutesEnum } from '@/enums';
import { LoginFormValues } from '@/types';
import { Button, Grid } from '@mui/material';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const {login, isLoggedIn} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
           router.push(RoutesEnum.HOME);
        }
    }, [isLoggedIn])

    enum FormFields {
        EMAIL = "email",
        PASSWORD = "password",
    }

    const initialValues: LoginFormValues = {
        email: "",
        password: "",
    }

    const handleSubmit = async (values: LoginFormValues, helpers: FormikHelpers<LoginFormValues>) => {
        setLoading(true);
        await login(values);

        // TODO: Improve to use API response error messages.
        if (!isLoggedIn) {
            setError("There was an issue logging you in.")
        }
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
                                    <Button type={"submit"} color={"success"} variant={"contained"}>
                                        Login
                                    </Button>
                                </div>
                                {error &&
                                    <p>{error}</p>}
                            </Grid>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}
export default LoginForm;