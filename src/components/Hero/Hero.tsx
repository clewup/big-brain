'use client'

import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Check as CheckIcon, X as CrossIcon } from 'react-feather'

const Hero = () => {
    function onSubmit() {}

    return (
        <div className="bg-primary h-[50vh] flex flex-col items-center justify-center text-white gap-10 rounded-md">
            <h1 className="font-palatino text-8xl font-bold">Expand your mind</h1>

            <div className="flex gap-20">
                <span className="flex gap-2 items-center font-semibold">
                    <CheckIcon />
                    <p>Free</p>
                </span>

                <span className="flex gap-2 items-center font-semibold">
                    <CheckIcon />
                    <p>Weekly</p>
                </span>

                <span className="flex gap-2 items-center font-semibold">
                    <CrossIcon />
                    <p>Spam</p>
                </span>
            </div>

            <Formik initialValues={{ email: '' }} onSubmit={onSubmit}>
                {() => {
                    return (
                        <Form className="bg-[#ccc] p-2 flex">
                            <Field
                                name="email"
                                type="text"
                                placeholder="Email address"
                                className="text-center bg-white text-black text-lg focus:outline-none border-b-2 border-white px-14 py-2"
                            />
                            <button type="submit" className="px-7 bg-primary font-semibold">
                                Join Free
                            </button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default Hero
