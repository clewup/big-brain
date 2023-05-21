import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import constants from '@/constants/constants'
import { PageContext } from '@/types/nextTypes'
import { Post as PrismaPost } from '@prisma/client'
import React from 'react'

async function getPostById(id: number): Promise<PrismaPost> {
    const postResponse = await fetch(`${constants.APP_URL}/api/post?id=${id}`, {
        method: 'GET',
        cache: 'no-store',
    })
    const postData = await postResponse.json()
    if (!postResponse.ok) throw new Error(postData.error)

    return postData
}

export default async function PostSlug({ params }: PageContext) {
    const post = await getPostById(Number(params.slug))

    if (!post) {
        return <p>Not found.</p>
    }

    return (
        <PageWrapper>
            <Post post={post} isFullPost={true} />
        </PageWrapper>
    )
}
