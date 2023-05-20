'use client'

import PageWrapper from '@/components/PageWrapper/PageWrapper'
import constants from '@/constants/constants'
import { LockrContext } from '@/lib/lockr-auth/contexts/LockrContext'
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik'
import { useContext, useRef } from 'react'
import { MultiValue } from 'react-select'
import Select from 'react-select/creatable'
import * as yup from 'yup'

export default function Create() {
    const formRef = useRef<FormikProps<CreateFormValues>>(null)
    const { user } = useContext(LockrContext)

    type CreateFormValues = {
        title: string
        content: string
        image: string
        categories: string[]
        comments: string[]
    }

    const initialValues: CreateFormValues = {
        title: '',
        content: '',
        image: '',
        categories: [],
        comments: [],
    }

    const validationSchema = yup.object().shape({
        title: yup
            .string()
            .typeError('Title must be a string')
            .min(5, 'Title must be 5 characters or more')
            .max(30, 'Title must be 30 characters or less')
            .required('Title is required'),
        content: yup
            .string()
            .typeError('Content must be a string')
            .min(30, 'Content must be 5 characters or more')
            .required('Content is required'),
        image: yup.string().typeError('Image must be a string').required('Image is required'),
        categories: yup
            .array()
            .of(yup.string())
            .min(1, 'At least one category is required')
            .max(5, 'Categories must be 5 or less'),
    })

    async function onSubmit(formValues: FormikValues, formHelpers: FormikHelpers<CreateFormValues>) {
        if (!user) return

        formHelpers.setSubmitting(true)
        await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                'x-user': user.email,
            },
        })
        formHelpers.setSubmitting(false)
    }

    async function uploadImage(image: Blob | undefined) {
        if (!image) return

        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', constants.CLOUDINARY_UPLOAD_PRESET)
        formData.append('cloud_name', constants.CLOUDINARY_CLOUD_NAME)

        const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dliog6kq6/image/upload', {
            method: 'POST',
            body: formData,
        })
        const cloudinaryData = await cloudinaryResponse.json()

        formRef?.current?.setFieldValue('image', cloudinaryData.url)
    }

    const ValidationError = (message: string) => <p className="text-error">{message}</p>

    return (
        <PageWrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                innerRef={formRef}
                validationSchema={validationSchema}>
                {({ values, setFieldValue }) => {
                    return (
                        <Form>
                            <span className="form-control">
                                <label className="label">Title</label>

                                <Field name="title" type="text" className="input input-bordered" />
                                <ErrorMessage name="title" component="p" className="text-error" />
                            </span>

                            <span className="form-control">
                                <label className="label">Content</label>

                                <Field name="content" type="text">
                                    {() => <textarea className="textarea textarea-bordered h-96"></textarea>}
                                </Field>
                                <ErrorMessage name="content" component="p" className="text-error" />
                            </span>

                            {values.image && (
                                <div className="mt-5 h-[300px] w-[300px] avatar">
                                    <img src={values.image} alt="post_image" className="mask mask-squircle" />
                                </div>
                            )}

                            <span className="form-control">
                                <label className="label">Image</label>

                                <input
                                    type="file"
                                    className="file-input file-input-bordered"
                                    onChange={({ target: { files } }) => uploadImage(files?.[0])}
                                />
                                <ErrorMessage name="image" component="p" className="text-error" />
                            </span>

                            <span className="form-control">
                                <label className="label">Categories</label>

                                <Select
                                    isMulti={true}
                                    onChange={(options: MultiValue<{ label: string; value: string }>) => {
                                        const flattenedOptions = options.flatMap((option) => option.value)
                                        setFieldValue('categories', flattenedOptions)
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 7,
                                        colors: {
                                            ...theme.colors,
                                            primary: '#CCCCCC',
                                        },
                                    })}
                                    classNames={{
                                        control: () => 'h-12',
                                    }}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            outline: '0 0 0 2px #CCCCCC',
                                        }),
                                    }}
                                />
                                <ErrorMessage name="categories" component="p" className="text-error" />
                            </span>

                            <div className="mt-10">
                                <button className="btn btn-primary">Create</button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </PageWrapper>
    )
}
