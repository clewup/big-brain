import prisma from '@/lib/prisma'
import { postsMapper } from '@/utils/mappers/postMapper'
import React from 'react'

async function getPosts() {
    const posts = await prisma.post.findMany({ include: { comments: true } })
    return postsMapper(posts)
}

export default async function Home() {
    //const posts = await getPosts()
    return (
        <main className="flex">
            <div className="w-1/4 border-r-2 border-branding-black h-full min-h-screen-header">
                <h1 className="text-7xl font-satisfice text-green-600">THE LATEST</h1>
            </div>
            <div>
                {/*{posts.map((post, index) => {*/}
                {/*    return <p key={index}>{post.title}</p>*/}
                {/*})}*/}
            </div>
        </main>
    )
}
