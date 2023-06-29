import Heading from '@/components/Heading/Heading'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import constants from '@/constants/constants'
import { PageContext } from '@/lib/common/types/nextTypes'
import { Post as PrismaPost } from '@prisma/client'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import React from 'react'

async function getPosts(): Promise<PrismaPost[]> {
    const postsResponse = await fetch(`${constants.APP_URL}/api/post`, {
        method: 'GET',
        cache: 'no-store',
    })
    const postsData = await postsResponse.json()

    if (!postsResponse.ok) throw new Error(postsData.error)

    return postsData
}

// eslint-disable-next-line no-empty-pattern
export async function generateMetadata({}: PageContext, parent: ResolvingMetadata): Promise<Metadata> {
    const previousImages = (await parent)?.openGraph?.images || []

    return {
        title: 'Big Brain',
        openGraph: {
            images: [...previousImages],
        },
    }
}

export default async function Home() {
    const posts = await getPosts()

    return (
        <PageWrapper className="flex">
            <div className="w-full flex flex-col gap-10">
                {posts.length && (
                    <div>
                        <div className="flex justify-between items-end">
                            <Heading>LATEST BRAINWAVES</Heading>
                            <Link className="flex gap-2 py-5" href="/posts">
                                <p>See all</p>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            {posts.slice(0, 6).map((post, index) => (
                                <Post key={index} post={post} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    )
}
