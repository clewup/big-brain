import styles from "./BlogPostForm.module.scss";
import { Field, Form, Formik } from "formik";
import { BlogPost } from "@/types/blogPost";
import React from "react";
import { Inputs } from "@/components/atoms/Inputs/Inputs";

const BlogPostForm = () => {
  const initialValues: Omit<BlogPost, "id"> = {
    title: "",
    imageUrl: "",
    content: "",
    date: new Date().toString(),
    tags: [],
  };

  const handleSubmit = () => {};

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }) => {
        return (
          <Form className={styles.blog_post_form}>
            <Field
              name={"title"}
              label={"Title"}
              component={Inputs.TEXT}
              onChange={handleChange}
              value={values.title}
            />
            <Field
              name={"content"}
              label={"Content"}
              component={Inputs.TEXT_AREA}
              onChange={handleChange}
              value={values.content}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
export default BlogPostForm;
