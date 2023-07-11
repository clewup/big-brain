'use client'

import useApi from '@/lib/common/hooks/useApi/useApi'
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik'
import React, { useState } from 'react'
import { Check as CheckIcon, X as CrossIcon } from 'react-feather'
import { TailSpin } from 'react-loader-spinner'
import * as Yup from 'yup'

const Hero = () => {
    const { post } = useApi()

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasSubmitted, setSubmitted] = useState(false)

    function onSubmit(formValues: FormikValues) {
        setLoading(true)
        post('/api/newsletter', formValues)
            .then(() => setSubmitted(true))
            .catch((err) => setError(err))
            .finally(() => setLoading(false))
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email address').required('Please enter an email address'),
    })

    return (
        <div className="bg-primary min-h-[50vh] flex flex-col items-center justify-center text-white gap-10 rounded-md p-10">
            <div className="flex flex-col gap-10 text-center items-center">
                <h1 className="text-5xl font-bold">Invest in yourself and unleash your potential</h1>
                <p className="text-2xl">Expand your knowledge base and strengthen your talents.</p>
            </div>

            <div className="flex gap-20">
                <span className="flex gap-2 items-center font-semibold">
                    <CheckIcon />
                    <p className="-tracking-tighter">FREE</p>
                </span>

                <span className="flex gap-2 items-center font-semibold">
                    <CheckIcon />
                    <p className="-tracking-tighter">WEEKLY</p>
                </span>

                <span className="flex gap-2 items-center font-semibold">
                    <CrossIcon />
                    <p className="-tracking-tighter">SPAM</p>
                </span>
            </div>

            {hasSubmitted ? (
                <div>
                    <p className="text-xl font-semibold">Thank you for joining the mailing list!</p>
                </div>
            ) : (
                <Formik initialValues={{ email: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {() => {
                        return (
                            <Form className="bg-[#ddd] p-2 rounded-md flex flex-col">
                                <span className="flex">
                                    <Field
                                        name="email"
                                        type="text"
                                        placeholder="Email address"
                                        className="text-center bg-white text-black text-lg focus:outline-none border-b-2 border-white px-14 py-2 rounded-tl-md rounded-bl-md"
                                    />
                                    <button
                                        type="submit"
                                        className="px-7 bg-primary font-semibold rounded-tr-md rounded-br-md flex items-center gap-2">
                                        Subscribe
                                        {isLoading && <TailSpin color="#ffffff" height={20} width={20} />}
                                    </button>
                                </span>
                                <ErrorMessage name="email">
                                    {(error) => <p className="my-1 text-error">{error}</p>}
                                </ErrorMessage>
                            </Form>
                        )
                    }}
                </Formik>
            )}
        </div>
    )
}

export default Hero
