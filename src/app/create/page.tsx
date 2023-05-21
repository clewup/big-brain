import PageWrapper from '@/components/PageWrapper/PageWrapper'
import PostForm from '@/components/PostForm/PostForm'
import constants from '@/constants/constants'
import { PageContext } from '@/types/nextTypes'
import { Post } from '@prisma/client'
import React from 'react'

async function getPostById(id: string | undefined): Promise<Post | undefined> {
    if (!id) {
        return undefined
    }

    const postResponse = await fetch(`${constants.APP_URL}/api/post?id=${id}`, {
        method: 'GET',
        cache: 'no-store',
    })
    return postResponse.json()
}

export default async function Create({ searchParams }: PageContext) {
    const initialPost = await getPostById(searchParams.id)

    return (
        <PageWrapper requireAdminRole={true}>
            <PostForm initialPost={initialPost} />
        </PageWrapper>
    )
}
