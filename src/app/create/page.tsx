'use client'

import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { LockrContext } from '@/lib/lockr-auth/contexts/LockrContext'
import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik'
import { useContext } from 'react'

export default function Create() {
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
        image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80',
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

    return (
        <PageWrapper>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {() => {
                    return (
                        <Form>
                            <span className="form-control">
                                <label className="label">Title</label>
                                <Field name="title" type="text" className="input input-bordered" />
                            </span>
                            <span className="form-control">
                                <label className="label">Content</label>
                                <Field name="content" type="text" className="input input-bordered" />
                            </span>

                            <span className="form-control">
                                <label className="label">Categories</label>
                                <select className="select select-bordered">
                                    <option>Select...</option>
                                    <option>Technology</option>
                                    <option>Gaming</option>
                                    <option>News</option>
                                </select>
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
