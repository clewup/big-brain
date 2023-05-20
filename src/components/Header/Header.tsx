'use client'

import useQueryParams from '@/hooks/useQueryParams/useQueryParams'
import { useLockr } from '@/lib/lockr-auth/contexts/LockrContext'
import useAuth from '@/lib/lockr-auth/hooks/useAuth'
import Avvvatars from 'avvvatars-react'
import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Search as SearchIcon } from 'react-feather'

export default function Header() {
    const { signIn, signOut } = useAuth({ redirectUri: 'http://localhost:3000', applicationId: 1 })
    const { user, isAdmin } = useLockr()
    const { queryParams, setQueryParams } = useQueryParams()
    const searchParams = useSearchParams()

    return (
        <div className="h-[20vh] p-2">
            <div className="flex  justify-between">
                <span className="flex items-center font-chomsky">
                    <div className="w-28 h-28 bg-secondary text-base-100 text-9xl flex justify-center items-center">
                        <h1>D</h1>
                    </div>
                    <h1 className="text-9xl">aily Blog</h1>
                </span>
            </div>
            <div className="h-14 bg-base-300 mt-2 flex items-center justify-between gap-20 px-2 rounded-xl">
                <span className="flex gap-20 mx-10">
                    <Link href={'/'}>Latest</Link>
                    <Link href={'/posts'}>All Posts</Link>
                </span>
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

                    {!user ? (
                        <span>
                            <button onClick={signIn}>Sign In</button>
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
                                {isAdmin && <AdminLinks />}

                                <li onClick={signOut}>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function AdminLinks() {
    return (
        <>
            <li>
                <Link href="/create" className="justify-between">
                    Create
                    <span className="badge badge-secondary">New</span>
                </Link>
            </li>
        </>
    )
}
