import styles from "./BlogPostForm.module.scss";
import { Field, Form, Formik } from "formik";
import { BlogPost } from "@/types/blogPost";
import React, { useState } from "react";
import { Inputs } from "@/components/atoms/Inputs/Inputs";
import UploadInput from "@/components/atoms/Inputs/components/UploadInput/UploadInput";
import Image from "next/image";
import { Grid } from "@mui/material";

const BlogPostForm = () => {
  const FormFields = {
    TITLE: "title",
    IMAGE_URL: "imageUrl",
    CONTENT: "content",
    TAGS: "tags",
  };

  const initialValues: Omit<BlogPost, "id"> = {
    title: "",
    imageUrl: "",
    content: "",
    date: new Date(),
    tags: [],
  };

  const handleSubmit = () => {};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
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
                    {values.imageUrl ? (
                      <Image
                        src={values.imageUrl}
                        alt={"image"}
                        height={250}
                        width={250}
                        className={styles.image}
                      />
                    ) : (
                      <Field
                        name={FormFields.IMAGE_URL}
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
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
export default BlogPostForm;
