import Category from '@/components/Category/Category'
import Hero from '@/components/Hero/Hero'
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

async function getCategories(): Promise<string[]> {
    const categoriesResponse = await fetch(`${constants.APP_URL}/api/category`, {
        method: 'GET',
        cache: 'reload',
    })
    const categoriesData = await categoriesResponse.json()

    if (!categoriesResponse.ok) throw new Error(categoriesData.error)

    return categoriesData
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
    const categories = await getCategories()

    return (
        <PageWrapper className="flex">
            <div className="w-full flex flex-col gap-10">
                <Hero />

                {categories.length && (
                    <div>
                        <div className="flex justify-between items-end">
                            <h1 className="py-5 text-4xl font-semibold">Knowledge Hubs</h1>
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            {categories.slice(0, 6).map((category, index) => (
                                <Category key={index} category={category} />
                            ))}
                        </div>
                    </div>
                )}

                {posts.length && (
                    <div>
                        <div className="flex justify-between items-end">
                            <h1 className="py-5 text-4xl font-semibold">Guides</h1>

                            <Link className="flex gap-2 py-5" href="/search">
                                <p className="text-neutral">See all</p>
                            </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            {posts.slice(0, 9).map((post, index) => (
                                <Post key={index} post={post} index={index} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    )
}
