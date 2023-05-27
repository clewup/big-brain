'use client'

import constants from '@/constants/constants'
import useApi from '@/hooks/useApi/useApi'
import { useLockr } from '@/lib/common/contexts/LockrContext'
import useAuth from '@/lib/common/hooks/useAuth'
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikValues } from 'formik'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface CommentFormProps {
    post: number
}

const CommentForm: FC<CommentFormProps> = ({ post }) => {
    const { post: apiPost } = useApi()
    const { user } = useLockr()
    const { signIn } = useAuth({
        redirectUri: `${constants.APP_URL}/post/${post}`,
        applicationId: constants.APPLICATION_ID,
    })
    const router = useRouter()

    type CommentFormValues = {
        content: string
        post: number
    }

    const initialValues: CommentFormValues = {
        content: '',
        post: post,
    }

    async function onSubmit(formValues: FormikValues, formHelpers: FormikHelpers<CommentFormValues>) {
        formHelpers.setSubmitting(true)

        await apiPost('/api/comment', formValues)

        formHelpers.setSubmitting(false)
        formHelpers.resetForm({ values: initialValues })

        router.refresh()
    }

    if (!user) {
        return (
            <div className="w-full flex flex-col gap-2">
                <h1 className="text-lg">Log in to leave a comment!</h1>
                <div>
                    <button className="btn btn-primary" onClick={signIn}>
                        Log in
                    </button>
                </div>
            </div>
        )
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, handleChange, isSubmitting }) => {
                return (
                    <Form>
                        <div className="form-control">
                            <label className="label" htmlFor="content">
                                Leave a comment
                            </label>
                            <Field name="content">
                                {() => {
                                    return (
                                        <textarea
                                            name="content"
                                            value={values.content}
                                            className="textarea textarea-bordered h-20"
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                        />
                                    )
                                }}
                            </Field>
                            <ErrorMessage name="content" component="p" className="text-error" />

                            <span className="mt-5">
                                <button className="btn btn-success" type="submit">
                                    Comment
                                </button>
                            </span>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default CommentForm
