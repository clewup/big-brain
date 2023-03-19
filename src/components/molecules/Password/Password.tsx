import styles from "./Password.module.scss";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";

interface IProps {
  handleSignIn: (password: string) => boolean;
}

const Password: React.FC<IProps> = ({ handleSignIn }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    const isSignedIn = handleSignIn(password);

    if (!isSignedIn) setError("Incorrect password");
  };

  return (
    <Formik initialValues={{ password: "" }} onSubmit={handleSubmit}>
      {({ touched }) => {
        return (
          <Form className={styles.password}>
            <p>Please check your emails for the password.</p>
            <span>
              <TextField
                variant={"standard"}
                type={"password"}
                onChange={(event) => setPassword(event.target.value)}
                error={touched && !!error}
                helperText={error}
                inputProps={{
                  style: {
                    backgroundColor: "white",
                    textAlign: "center",
                    fontSize: "1.1rem",
                  },
                }}
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
