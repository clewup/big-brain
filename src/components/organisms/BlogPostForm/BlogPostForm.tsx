import styles from "./BlogPostForm.module.scss";
import { Field, Form, Formik, FormikProps } from "formik";
import { BlogPost } from "@/types/blogPostTypes";
import React, { useRef } from "react";
import { Inputs } from "@/components/atoms/Inputs/Inputs";
import Image from "next/image";
import { Grid } from "@mui/material";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

type FormValues = Omit<BlogPost, "id">;

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

    titlePos: [0, 0],
    imagePos: [0, 0],
    contentPos: [0, 0],
    tagsPos: [0, 0],
  };

  const handleSubmit = () => {};

  const handleDrag = (
    event: DraggableEvent,
    data: DraggableData,
    field: FormFields
  ) => {
    formRef.current?.setFieldValue(`${field}Pos`, [data.x, data.y]);
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
              <Draggable
                onStop={(e, d) => handleDrag(e, d, FormFields.TITLE)}
                position={{ x: values.titlePos[0], y: values.titlePos[1] }}
              >
                <Grid item xs={12}>
                  <Field
                    name={FormFields.TITLE}
                    component={Inputs.TEXT}
                    onChange={handleChange}
                    value={values.title}
                    label={"Title"}
                  />
                </Grid>
              </Draggable>

              <Draggable
                onStop={(e, d) => handleDrag(e, d, FormFields.IMAGE)}
                position={{ x: values.imagePos[0], y: values.imagePos[1] }}
              >
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
              </Draggable>

              <Draggable
                onStop={(e, d) => handleDrag(e, d, FormFields.CONTENT)}
                position={{ x: values.contentPos[0], y: values.contentPos[1] }}
              >
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
              </Draggable>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
export default BlogPostForm;
