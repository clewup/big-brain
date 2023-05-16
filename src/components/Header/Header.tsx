import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <div className="h-[25vh]">
            <div className="flex font-chomsky justify-between">
                <span className="flex items-center">
                    <div className="w-28 h-28 bg-red-600 text-branding-beige text-9xl flex justify-center items-center">
                        <h1>D</h1>
                    </div>
                    <h1 className="text-9xl">aily Blog</h1>
                </span>
                <span className="text-3xl flex gap-2">
                    <p className="text-purple-400">email: </p>
                    <p>hello@clewup.co.uk</p>
                </span>
            </div>
            <div className="h-14 bg-branding-black mt-2 text-branding-beige text-3xl flex items-center justify-center gap-20">
                <Link href={'/'}>
                    <p>HOME</p>
                </Link>
                <Link href={'/posts'}>
                    <p>POSTS</p>
                </Link>
                <Link href={'/authors'}>
                    <p>AUTHORS</p>
                </Link>
            </div>
        </div>
    )
}
