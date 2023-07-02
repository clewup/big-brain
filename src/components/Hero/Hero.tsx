'use client'

import { Field, Form, Formik } from 'formik'
import { motion as m, Variants } from 'framer-motion'
import React from 'react'
import { Check as CheckIcon, X as CrossIcon } from 'react-feather'

const Hero = () => {
    function onSubmit() {
        //todo: implement newsletter
        return
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delay: 1, duration: 0.5 } },
    }

    return (
        <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-primary min-h-[50vh] flex flex-col items-center justify-center text-white gap-10 rounded-md">
            <div className="flex flex-col items-center gap-5">
                <h1 className="font-palatino text-8xl font-bold">Unleash your potential</h1>
                <p className="text-3xl">with Big Brain, where knowledge meets inspiration.</p>
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
                                Join Free
                            </button>
                        </Form>
                    )
                }}
            </Formik>
        </m.div>
    )
}

export default Hero
