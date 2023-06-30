'use client'

import constants from '@/constants/constants'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { Field, Form, Formik } from 'formik'
import { motion as m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Edit as EditIcon, Search as SearchIcon, User as UserIcon } from 'react-feather'

export default function Header() {
    const { signIn, signOut } = useAuth({ redirectUri: constants.APP_URL, applicationId: constants.APPLICATION_ID })
    const { user } = useLockr()
    const { queryParams, setQueryParams } = useQueryParams()
    const searchParams = useSearchParams()

    const routes = [
        {
            label: 'ALL IDEAS',
            path: '/search',
        },
        {
            label: 'SHARE',
            path: '/write',
        },
    ]

    return (
        <div className="p-2 flex flex-col justify-between gap-5 md:h-[15vh] md:flex-row items-center px-40">
            <m.div
                variants={{
                    hidden: {
                        y: -75,
                        opacity: 0,
                    },
                    visible: {
                        y: 0,
                        opacity: 1,
                    },
                }}
                initial="hidden"
                animate="visible"
                className="flex gap-10">
                <Link href="/">
                    <Image
                        src="https://res.cloudinary.com/dliog6kq6/image/upload/v1688161397/Logo_jewaxq.png"
                        alt="logo"
                        width={150}
                        height={30}
                    />
                </Link>

                <div className="flex justify-between z-20">
                    <m.span
                        variants={{
                            hidden: {
                                x: -75,
                                opacity: 0,
                            },
                            visible: {
                                x: 0,
                                opacity: 1,
                                transition: {
                                    delay: 0.3,
                                },
                            },
                        }}
                        initial="hidden"
                        animate="visible"
                        className="flex gap-5 font-bold mr-5 md:gap-10 md:mr-10 items-center text-neutral">
                        {routes.map((route, index) => (
                            <Link key={index} href={route.path}>
                                {route.label}
                            </Link>
                        ))}
                    </m.span>
                </div>
            </m.div>

            <div className=" flex flex-col items-center justify-between md:flex-row z-20">
                <div className="flex gap-2 items-center justify-center">
                    <Formik
                        initialValues={{ search: searchParams.get('search') || '' }}
                        onSubmit={(formValues) => {
                            const updatedQuery = { ...queryParams, search: formValues.search, page: null }
                            setQueryParams(updatedQuery, '/search')
                        }}>
                        <Form>
                            <div className="flex gap-2 items-center">
                                <Field
                                    name="search"
                                    type="text"
                                    placeholder="Search great ideas"
                                    className="bg-white text-black text-lg focus:outline-none border-b-2 border-neutral"
                                />
                                <button>
                                    <SearchIcon className="text-neutral" />
                                </button>
                            </div>
                        </Form>
                    </Formik>

                    <div className="min-w-[80px] flex justify-end">
                        {!user ? (
                            <span>
                                <button className="btn btn-ghost" onClick={signIn}>
                                    Log in
                                </button>
                            </span>
                        ) : (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle">
                                    <UserIcon className="text-neutral" />
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="mt-3 bg-base-200 p-2 menu menu-compact dropdown-content rounded-box w-52">
                                    <li onClick={signOut}>
                                        <a>Logout</a>
                                    </li>
                                    <li className="block md:hidden">
                                        <Link href="/write" className="flex gap-2 items-center">
                                            Share
                                            <EditIcon size={15} />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
