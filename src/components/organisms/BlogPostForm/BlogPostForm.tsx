import styles from "./BlogPostForm.module.scss";
import { Field, Form, Formik } from "formik";
import { BlogPost } from "@/types/blogPost";
import React, { useState } from "react";
import { Inputs } from "@/components/atoms/Inputs/Inputs";
import UploadInput from "@/components/atoms/Inputs/components/UploadInput/UploadInput";
import Image from "next/image";

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
        console.log(values);
        return (
          <Form className={styles.blog_post_form}>
            <span className={styles.image_container}>
              {values.imageUrl ? (
                <Image
                  src={values.imageUrl}
                  alt={"image"}
                  height={270}
                  width={270}
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
            <Field
              name={FormFields.TITLE}
              label={"Title"}
              component={Inputs.TEXT}
              onChange={handleChange}
              value={values.title}
            />
            <Field
              name={FormFields.CONTENT}
              label={"Content"}
              component={Inputs.TEXT_AREA}
              onChange={handleChange}
              value={values.content}
            />

            <p>{values.date.toDateString()}</p>
          </Form>
        );
      }}
    </Formik>
  );
};
export default BlogPostForm;
