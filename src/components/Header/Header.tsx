'use client'

import constants from '@/constants/constants'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { Field, Form, Formik } from 'formik'
import { motion as m, Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Search as SearchIcon, User as UserIcon } from 'react-feather'

export default function Header() {
    const { signIn, signOut } = useAuth({ applicationId: constants.APPLICATION_ID, redirectUri: constants.APP_URL })
    const { isAdmin, user } = useLockr()
    const { queryParams, setQueryParams } = useQueryParams()
    const searchParams = useSearchParams()

    const logoVariants = {
        hidden: {
            opacity: 0,
            y: -75,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    }

    const routes = [
        {
            isAdmin: false,
            label: 'Guides',
            path: '/search',
        },
        {
            isAdmin: false,
            label: 'Knowledge Hubs',
            path: '/hubs',
        },
        {
            isAdmin: true,
            label: 'Editor',
            path: '/editor',
        },
    ]

    const routeVariants: Variants = {
        hidden: {
            opacity: 0,
            x: -75,
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
            },
            x: 0,
        },
    }

    return (
        <div className="flex flex-col justify-between gap-5 md:h-[10vh] md:flex-row items-center px-40 bg-white">
            <div className="flex gap-20">
                <m.div variants={logoVariants} initial="hidden" animate="visible" className="relative z-50">
                    <Link href="/">
                        <Image
                            src="https://res.cloudinary.com/dliog6kq6/image/upload/v1688161397/Logo_jewaxq.png"
                            alt="logo"
                            width={120}
                            height={30}
                        />
                    </Link>
                </m.div>

                <div className="flex gap-10">
                    <m.div
                        variants={routeVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex gap-5 mr-5 md:gap-10 md:mr-10 items-center text-neutral">
                        {routes.map((route, index) => {
                            if (route.isAdmin && !isAdmin) {
                                return
                            }

                            return (
                                <Link key={index} href={route.path}>
                                    {route.label}
                                </Link>
                            )
                        })}
                    </m.div>
                </div>
            </div>

            <div className=" flex flex-col items-center justify-between md:flex-row z-20">
                <div className="flex gap-2 items-center justify-center">
                    <Formik
                        initialValues={{ search: searchParams.get('search') || '' }}
                        onSubmit={(formValues) => {
                            const updatedQuery = { ...queryParams, page: null, search: formValues.search }
                            setQueryParams(updatedQuery, '/search')
                        }}>
                        <Form>
                            <div className="flex gap-2 items-center">
                                <Field
                                    name="search"
                                    type="text"
                                    placeholder="Search guides"
                                    className="bg-transparent text-black pb-2 focus:outline-none border-b-2 border-neutral"
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
                                <button className="btn btn-ghost text-neutral" onClick={signIn}>
                                    Log in
                                </button>
                            </span>
                        ) : (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle text-neutral">
                                    <UserIcon />
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="mt-3 bg-base-200 p-2 menu menu-compact dropdown-content rounded-box w-52">
                                    <li onClick={signOut}>
                                        <a>Logout</a>
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
