import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import prisma from '@/lib/prisma'
import React from 'react'

async function getPosts() {
    return prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
}

export default async function Posts() {
    const posts = await getPosts()

    return (
        <PageWrapper>
            <h1 className="text-6xl font-satisfice">READ ALL ABOUT IT</h1>
            <div className="grid grid-cols-3 gap-5">
                {posts.map((post, index) => (
                    <Post key={index} post={post} isLatest={index === 0} />
                ))}
            </div>
        </PageWrapper>
    )
}
