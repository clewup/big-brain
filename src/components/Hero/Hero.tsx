'use client'

import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Check as CheckIcon, X as CrossIcon } from 'react-feather'

const Hero = () => {
    function onSubmit() {
        //todo: implement newsletter
        return
    }

    return (
        <div className="bg-primary min-h-[50vh] flex flex-col items-center justify-center text-white gap-10 rounded-md p-10">
            <div className="flex flex-col gap-5 text-center">
                <h1 className="font-palatino text-5xl font-bold md:text-8xl">Unleash your potential.</h1>
                <p className="text-3xl">Learn new skills and enhance existing ones.</p>
            </div>

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
                                Subscribe
                            </button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default Hero
