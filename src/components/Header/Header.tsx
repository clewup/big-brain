'use client'

import constants from '@/constants/constants'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { Field, Form, Formik } from 'formik'
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
    ]

    return (
        <div className="flex flex-col justify-between py-5 gap-5 items-center px-40 bg-white md:h-[10vh] md:flex-row md:py-0">
            <div className="flex flex-col items-center gap-5 md:flex-row md:gap-20">
                <div className="relative z-50">
                    <Link href="/">
                        <Image
                            src="https://res.cloudinary.com/dliog6kq6/image/upload/v1688161397/Logo_jewaxq.png"
                            alt="logo"
                            width={120}
                            height={30}
                        />
                    </Link>
                </div>

                <div className="flex gap-10">
                    <div className="flex gap-10 mr-5 items-center text-neutral md:mr-10">
                        {routes.map((route, index) => {
                            if (route.isAdmin && !isAdmin) {
                                return
                            }

                            return (
                                <Link key={index} href={route.path} className="whitespace-nowrap">
                                    {route.label}
                                </Link>
                            )
                        })}
                    </div>
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
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle text-neutral" onClick={signIn}>
                                    <UserIcon />
                                </label>
                            </div>
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
