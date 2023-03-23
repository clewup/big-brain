import styles from "./BlogPostForm.module.scss";
import { Field, Form, Formik, FormikProps, FormikValues } from "formik";
import { BlogPost } from "@/types/blogPostTypes";
import React, { useRef } from "react";
import { Inputs } from "@/components/atoms/Inputs/Inputs";
import Image from "next/image";
import { Grid } from "@mui/material";
import { Endpoints } from "@/enums/endpoints";
import { HttpMethods } from "@/enums/httpMethods";
import ActionRow from "@/components/organisms/BlogPostForm/components/ActionRow/ActionRow";

type FormValues = Omit<BlogPost, "_id">;

const BlogPostForm = () => {
  const formRef = useRef<FormikProps<FormValues>>(null);

  enum FormFields {
    TITLE = "title",
    IMAGE = "image",
    CONTENT = "content",
    DATE = "date",
    TAGS = "tags",
  }

  const initialValues: FormValues = {
    title: "",
    image: "",
    content: "",
    date: new Date(),
    tags: [],
  };

  const handleSubmit = (values: FormikValues) => {
    fetch(Endpoints.POST, {
      method: HttpMethods.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
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
                  label={"Title"}
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <div className={styles.image_container}>
                  <span className={styles.image_placeholder}>
                    {values.image ? (
                      <Image
                        src={values.image}
                        alt={"image"}
                        height={250}
                        width={250}
                        className={styles.image}
                      />
                    ) : (
                      <Field
                        name={FormFields.IMAGE}
                        component={Inputs.UPLOAD}
                        accept={"image/*"}
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
                  label={"Content"}
                />
              </Grid>

              <Grid item xs={12}>
                <ActionRow onCancel={handleCancel} />
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
export default BlogPostForm;
