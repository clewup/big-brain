import styles from "./Password.module.scss";
import React from "react";
import { Button } from "@mui/material";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Inputs } from "@/components/atoms/Inputs/Inputs";

interface IProps {
  handleSignIn: (password: string) => boolean;
}

const Password: React.FC<IProps> = ({ handleSignIn }) => {
  const initialValues = {
    password: "",
  };

  const handleSubmit = (
    values: FormikValues,
    helpers: FormikHelpers<{ password: string }>
  ) => {
    const isSignedIn = handleSignIn(values.password);

    if (!isSignedIn) helpers.setFieldError("password", "Incorrect password");
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, helpers) => handleSubmit(values, helpers)}
    >
      {({ values, touched, handleChange, errors }) => {
        return (
          <Form className={styles.password}>
            <p>Please check your emails for the password.</p>
            <span>
              <Field
                name={"password"}
                component={Inputs.TEXT}
                onChange={handleChange}
                value={values.password}
                type={"password"}
              />
              <Button type={"submit"}>Sign In</Button>
            </span>
          </Form>
        );
      }}
    </Formik>
  );
};
export default Password;
