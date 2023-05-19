'use client'

import PageWrapper from '@/components/PageWrapper/PageWrapper'
import constants from '@/constants/constants'
import { LockrContext } from '@/lib/lockr-auth/contexts/LockrContext'
import { Field, Form, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik'
import { useContext, useRef } from 'react'
import { MultiValue } from 'react-select'
import Select from 'react-select/creatable'

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

    return (
        <PageWrapper>
            <Formik initialValues={initialValues} onSubmit={onSubmit} innerRef={formRef}>
                {({ values, setFieldValue }) => {
                    console.log(values)
                    return (
                        <Form>
                            <span className="form-control">
                                <label className="label">Title</label>
                                <Field name="title" type="text" className="input input-bordered" />
                            </span>

                            <span className="form-control">
                                <label className="label">Content</label>
                                <Field name="content" type="text">
                                    {() => <textarea className="textarea textarea-bordered h-96"></textarea>}
                                </Field>
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
