import prisma from '@/lib/prisma'
import { postsMapper } from '@/utils/mappers/postMapper'
import React from 'react'

async function getPosts() {
    const posts = await prisma.post.findMany({ include: { comments: true } })
    return postsMapper(posts)
}

export default async function Home() {
    const posts = await getPosts()
    return (
        <main>
            {posts.map((post, index) => {
                return <p key={index}>{post.title}</p>
            })}
        </main>
    )
}
