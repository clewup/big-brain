'use client'

import constants from '@/constants/constants'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import Avvvatars from 'avvvatars-react'
import { Field, Form, Formik } from 'formik'
import { motion as m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Edit as EditIcon, Search as SearchIcon } from 'react-feather'

export default function Header() {
    const { signIn, signOut } = useAuth({ redirectUri: constants.APP_URL, applicationId: constants.APPLICATION_ID })
    const { user } = useLockr()
    const { queryParams, setQueryParams } = useQueryParams()
    const searchParams = useSearchParams()

    const routes = [
        {
            label: 'LATEST',
            path: '/',
        },
        {
            label: 'ALL IDEAS',
            path: '/posts',
        },
        {
            label: 'AUTHORS',
            path: '/authors',
        },
        {
            label: 'SHARE',
            path: '/write',
        },
    ]

    return (
        <div className="relative p-2 flex flex-col justify-between gap-5 md:h-[15vh] md:flex-row items-center px-40">
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
                className="absolute w-full left-0 flex justify-center z-10">
                <Link href="/">
                    <Image src="/images/logo.png" alt="logo" width={200} height={30} />
                </Link>
            </m.div>

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
                    className="flex gap-5 font-bold mr-5 md:gap-10 md:mr-10 items-center">
                    {routes.map((route, index) => (
                        <Link key={index} href={route.path}>
                            {route.label}
                        </Link>
                    ))}
                </m.span>
            </div>

            <div className=" flex flex-col gap-5 items-center justify-between md:flex-row md:gap-10 z-20">
                <div className="flex gap-2 items-center justify-center">
                    <Formik
                        initialValues={{ search: searchParams.get('search') || '' }}
                        onSubmit={(formValues) => {
                            const updatedQuery = { ...queryParams, search: formValues.search, page: null }
                            setQueryParams(updatedQuery, '/posts')
                        }}>
                        <Form>
                            <div className="input-group">
                                <Field
                                    name="search"
                                    type="text"
                                    placeholder="Search"
                                    className="input bg-white text-black"
                                />
                                <button className="btn btn-square btn-primary">
                                    <SearchIcon />
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
                                    <div className="w-10">
                                        {user.image ? (
                                            <span className="avatar">
                                                <Image
                                                    src={user.image}
                                                    alt="user_image"
                                                    width={50}
                                                    height={50}
                                                    className="mask mask-squircle"
                                                />
                                            </span>
                                        ) : (
                                            <Avvvatars value={user.email} size={40} />
                                        )}
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="mt-3 bg-base-200 p-2 menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    <li onClick={signOut}>
                                        <a>Logout</a>
                                    </li>
                                    <li className="block md:hidden">
                                        <Link href="/write" className="flex gap-2 items-center">
                                            Write
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
