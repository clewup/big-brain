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

            <Formik initialValues={{ email: '' }} onSubmit={onSubmit}>
                {() => {
                    return (
                        <Form className="bg-[#ddd] p-2 flex rounded-md">
                            <Field
                                name="email"
                                type="text"
                                placeholder="Email address"
                                className="text-center bg-white text-black text-lg focus:outline-none border-b-2 border-white px-14 py-2 rounded-tl-md rounded-bl-md"
                            />
                            <button type="submit" className="px-7 bg-primary font-semibold rounded-tr-md rounded-br-md">
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
