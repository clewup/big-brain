'use client'

import constants from '@/constants/constants'
import useQueryParams from '@/hooks/useQueryParams/useQueryParams'
import { useLockr } from '@/lib/lockr-auth/contexts/LockrContext'
import useAuth from '@/lib/lockr-auth/hooks/useAuth'
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
            label: 'Latest',
            path: '/',
        },
        {
            label: 'All Posts',
            path: '/posts',
        },
        {
            label: 'Authors',
            path: '/authors',
        },
    ]

    return (
        <div className="p-2 flex flex-col justify-between gap-5 md:h-[8vh] md:px-40 md:flex-row">
            <div className="flex justify-between">
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
                    animate="visible">
                    <Link href="/" className="flex items-center font-chomsky">
                        <div className="w-12 h-12 bg-secondary text-base-100 text-6xl flex justify-center items-center">
                            <h1>D</h1>
                        </div>
                        <h1 className="hidden text-6xl md:block">aily Blog</h1>
                    </Link>
                </m.div>

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
                    className="flex gap-5 mx-5 md:gap-10 md:mx-10 items-center md:text-lg">
                    {routes.map((route, index) => (
                        <Link key={index} href={route.path}>
                            {route.label}
                        </Link>
                    ))}
                </m.span>
            </div>
            <div className=" flex flex-col gap-5 items-center justify-between md:flex-row md:gap-10">
                <Link href="/write" className="hidden gap-2 items-center text-lg md:block md:flex md:flex-row">
                    Write
                    <EditIcon size={20} />
                </Link>
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
                                    className="input input-bordered"
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
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
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
                                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
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
