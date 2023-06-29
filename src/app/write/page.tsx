import PageWrapper from '@/components/PageWrapper/PageWrapper'
import PostForm from '@/components/PostForm/PostForm'
import constants from '@/constants/constants'
import { PageContext } from '@/lib/common/types/nextTypes'
import { Post } from '@prisma/client'
import { Metadata, ResolvingMetadata } from 'next'
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

export async function generateMetadata({ searchParams }: PageContext, parent: ResolvingMetadata): Promise<Metadata> {
    const initialPost = await getPostById(searchParams.id)
    const previousImages = (await parent)?.openGraph?.images || []

    return {
        title: initialPost?.title ? `Big Brain - ${initialPost.title}` : 'Big Brain - Create',
        openGraph: {
            images: [initialPost?.image || '', ...previousImages],
        },
    }
}

export default async function Write({ searchParams }: PageContext) {
    const initialPost = await getPostById(searchParams.id)

    return (
        <PageWrapper requireLoggedIn={true}>
            <PostForm initialPost={initialPost} />
        </PageWrapper>
    )
}
