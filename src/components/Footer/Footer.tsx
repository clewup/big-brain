'use client'

import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    function onSubmit() {}

    return (
        <div className="w-full  flex flex-col items-center gap-10 py-10 md:px-40">
            <div className="bg-primary text-white w-full flex flex-col gap-5 justify-center items-center py-10">
                <h1 className="font-palatino text-4xl font-bold">Join the newsletter</h1>

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

            <div className="flex w-full gap-40 text-neutral">
                <span className="flex-col w-1/2">
                    <h1 className="text-xl mb-2 text-black font-semibold">Most viewed</h1>
                </span>

                <div className="w-1/2 flex justify-between">
                    <span className="flex-col">
                        <h1 className="text-xl mb-2 text-black font-semibold">Company</h1>
                    </span>
                    <span className="flex-col">
                        <h1 className="text-xl mb-2 text-black font-semibold">Resources</h1>
                    </span>
                    <span className="flex-col">
                        <h1 className="text-xl mb-2 text-black font-semibold">Contact</h1>
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-5 items-center text-neutral mt-5">
                <Link href="/">
                    <Image
                        src="https://res.cloudinary.com/dliog6kq6/image/upload/v1688161397/Logo_jewaxq.png"
                        alt="logo"
                        width={100}
                        height={30}
                    />
                </Link>
                <Link href="/privacy">
                    <p className="font-bold">PRIVACY POLICY</p>
                </Link>
            </div>
        </div>
    )
}

export default Footer
