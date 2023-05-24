'use client'

import constants from '@/constants/constants'
import metadata from '@/constants/metadata'
import { useNotification } from '@/contexts/NotificationContext/NotificationContext'
import useApi from '@/hooks/useApi/useApi'
import { useLockr } from '@/lib/lockr-auth/contexts/LockrContext'
import { Post } from '@prisma/client'
import cx from 'classnames'
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik'
import { useRouter } from 'next/navigation'
import React, { FC, useRef, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { MultiValue } from 'react-select'
import Select from 'react-select/creatable'
import * as yup from 'yup'

interface PostFormProps {
    initialPost?: Post
}

const PostForm: FC<PostFormProps> = ({ initialPost }) => {
    const formRef = useRef<FormikProps<CreateFormValues>>(null)
    const { post } = useApi()
    const router = useRouter()
    const { pushNotification } = useNotification()
    const { user, isAdmin } = useLockr()

    if (!user || (initialPost && initialPost.createdBy !== user.email && !isAdmin)) {
        router.push('/')
    }

    const [isImageLoading, setImageLoading] = useState(false)

    type CreateFormValues = {
        title: string
        content: string
        image: string
        categories: string[]
    }

    const initialValues: CreateFormValues = {
        title: '',
        content: '',
        image: '',
        categories: [],
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
            .min(30, 'Content must be 30 characters or more')
            .required('Content is required'),
        image: yup.string().typeError('Image must be a string').required('Image is required'),
        categories: yup
            .array()
            .of(yup.string())
            .min(1, 'At least one category is required')
            .max(5, 'Categories must be 5 or less'),
    })

    async function onSubmit(formValues: FormikValues, formHelpers: FormikHelpers<CreateFormValues>) {
        formHelpers.setSubmitting(true)

        const postResponse = await post<Post>('/api/post', formValues)
        if (!postResponse.ok) throw new Error('There was a problem creating the post')
        const postData: Post = await postResponse.json()

        formHelpers.setSubmitting(false)

        pushNotification({
            text: 'Post created!',
            variant: 'success',
        })

        setTimeout(() => {
            router.refresh()
            router.push(`/post/${postData.id}`)
        }, 100)
    }

    async function uploadImage(image: Blob | undefined) {
        if (!image) return

        setImageLoading(true)
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
        setImageLoading(false)
    }

    function formatSelectOptions(options: string[]) {
        return options.map((option) => ({ label: option, value: option }))
    }

    return (
        <Formik
            initialValues={initialPost || initialValues}
            enableReinitialize={true}
            onSubmit={onSubmit}
            innerRef={formRef}
            validationSchema={validationSchema}>
            {({ values, setFieldValue, handleChange, isSubmitting }) => {
                return (
                    <Form>
                        <div className="flex items-center justify-center gap-20 mb-10">
                            {isImageLoading ? (
                                <div className="my-5">
                                    <TailSpin color="#111111" width={50} height={50} />
                                </div>
                            ) : values.image ? (
                                <div className="mt-5 h-[300px] w-[300px] avatar">
                                    <img src={values.image} alt="post_image" className="mask mask-squircle" />
                                </div>
                            ) : (
                                <div className="mt-5 h-[300px] w-[300px] avatar">
                                    <img
                                        src={metadata.images.placeholder}
                                        alt="post_image"
                                        className="mask mask-squircle"
                                    />
                                </div>
                            )}

                            <div>
                                <span className="form-control">
                                    <label className="label">Image</label>

                                    <input
                                        type="file"
                                        className="file-input file-input-bordered"
                                        disabled={isSubmitting}
                                        onChange={({ target: { files } }) => uploadImage(files?.[0])}
                                    />
                                    <ErrorMessage name="image" component="p" className="text-error" />
                                </span>
                                <span className="form-control">
                                    <label className="label">Title</label>

                                    <Field
                                        name="title"
                                        type="text"
                                        className="input input-bordered"
                                        disabled={isSubmitting}
                                    />
                                    <ErrorMessage name="title" component="p" className="text-error" />
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
                                            control: (provided) => ({
                                                ...provided,
                                                outline: '0 0 0 2px #CCCCCC',
                                            }),
                                        }}
                                        isDisabled={isSubmitting}
                                        value={formatSelectOptions(values.categories)}
                                        components={{
                                            Menu: () => null, // Remove menu
                                            MenuList: () => null, // Remove menu list
                                            DropdownIndicator: () => null, // Remove dropdown icon
                                            IndicatorSeparator: () => null, // Remove separator
                                        }}
                                    />
                                    <ErrorMessage name="categories" component="p" className="text-error" />
                                </span>
                            </div>
                        </div>

                        <span className="form-control">
                            <label className="label">Content</label>

                            <Field name="content">
                                {() => {
                                    return (
                                        <textarea
                                            name="content"
                                            value={values.content}
                                            className="textarea textarea-bordered h-96"
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                        />
                                    )
                                }}
                            </Field>
                            <ErrorMessage name="content" component="p" className="text-error" />
                        </span>

                        <div className="mt-10">
                            <button
                                className={cx('btn btn-primary', { loading: isSubmitting })}
                                disabled={isSubmitting}>
                                {initialPost ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default PostForm
