'use client'

import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, Twitter } from 'react-feather'

const Footer = () => {
    const routeSections = [
        {
            routes: [
                {
                    label: 'Knowledge Hubs',
                    path: '/hubs',
                },
                {
                    label: 'Guides',
                    path: '/search',
                },
            ],
            title: 'Platform',
        },
        {
            routes: [
                {
                    label: 'TypeScript',
                    path: '/hubs/TypeScript',
                },
                {
                    label: 'JavaScript',
                    path: '/hubs/JavaScript',
                },
            ],
            title: 'Popular',
        },
        {
            routes: [
                {
                    label: 'About us',
                    path: '/',
                },
                {
                    label: 'FAQ',
                    path: '/',
                },
                {
                    label: 'Jobs',
                    path: '/',
                },
            ],
            title: 'Company',
        },
        {
            routes: [
                {
                    label: 'Authors',
                    path: '/',
                },
            ],
            title: 'Community',
        },
        {
            routes: [
                {
                    label: <Twitter />,
                    path: '',
                },
                {
                    label: <Instagram />,
                    path: '',
                },
                {
                    label: <Facebook />,
                    path: '',
                },
            ],
            title: 'Contact',
        },
    ]

    return (
        <div className="w-full flex flex-col items-center gap-10 pt-10 md:px-40 bg-white text-neutral mt-20 p-5 md:p-0 md:pt-10">
            <div className="flex w-full flex-col md:flex-row md:gap-40">
                <div className="flex flex-row gap-5 md:flex-col md:w-1/4">
                    <Link href="/">
                        <Image
                            src="https://res.cloudinary.com/dliog6kq6/image/upload/v1688161397/Logo_jewaxq.png"
                            alt="logo"
                            width={120}
                            height={30}
                        />
                    </Link>

                    <div className="w-2/3">
                        <p className="text-black md:text-xl">Expand your knowledge base and strengthen your talents.</p>
                    </div>
                </div>

                <div className="py-5 grid grid-cols-2 gap-5 md:w-3/4 md:py-0 md:gap-0 md:flex md:flex-row md:justify-between">
                    {routeSections.map((routeSection, index) => (
                        <div key={index}>
                            <h1 className="text-lg mb-2 text-black font-semibold">{routeSection.title}</h1>

                            <span
                                className={cx(
                                    'flex',
                                    routeSection.title === 'Contact' ? 'flex-row gap-2' : 'flex-col'
                                )}>
                                {routeSection.routes.map((route, index) => (
                                    <Link key={index} href={route.path}>
                                        <p>{route.label}</p>
                                    </Link>
                                ))}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between w-full border-t-2 border-base-300 py-5">
                <Link href="/privacy">
                    <p>Privacy Policy</p>
                </Link>

                <p>© 2023 BigBrain</p>
            </div>
        </div>
    )
}

export default Footer
