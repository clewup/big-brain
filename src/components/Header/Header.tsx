'use client'

import useLockr from '@/lib/lockr-auth/hooks/useLockr'
import Avvvatars from 'avvvatars-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
    const { signIn, signOut, user } = useLockr({ redirectUri: 'http://localhost:3000', applicationId: 1 })

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
                    <Link href={'/'}>All Posts</Link>
                    <Link href={'/'}>Categories</Link>
                </span>
                <div className="flex gap-2 items-center justify-center">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered" />
                    </div>
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
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li>
                                    <a>Settings</a>
                                </li>
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