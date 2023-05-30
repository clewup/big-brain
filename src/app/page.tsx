import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import constants from '@/constants/constants'
import { PageContext } from '@/lib/common/types/nextTypes'
import { Post as PrismaPost } from '@prisma/client'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import React from 'react'

// async function getLikedTweets() {
//     const params = 'tweet.fields=lang,author_id,created_at,public_metrics,entities&media.fields=url,height'
//     const twitterResponse = await fetch(
//         `https://api.twitter.com/2/users/${process.env.TWITTER_USER_ID}/liked_tweets?${params}`,
//         {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
//             },
//         }
//     )
//     const twitterData = await twitterResponse.json()
//     return mapLikedTweets(twitterData)
// }

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
        title: 'Blog',
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
                <div className="hero bg-base-200 rounded-2xl text-center">
                    <div className="hero-content flex-col">
                        <div className="flex flex-col items-center py-5 md:p-10 gap-5">
                            <h1 className="md:text-xl -tracking-tighter uppercase font-bold text-gray-500">
                                WELCOME TO THE DAILY BLOG
                            </h1>
                            <span className="flex gap-1 text-xl md:text-2xl">
                                <p>Write, </p>
                                <p className="text-secondary">Inspire</p>
                                <p>and Collaborate! 💫</p>
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <Post post={posts[0]} isLatest={true} />
                </div>
                {posts.length > 1 && (
                    <div>
                        <div className="flex justify-between items-end">
                            <h1 className="text-6xl font-satisfice">LATEST NEWS</h1>
                            <Link className="flex gap-2" href="/posts">
                                <p>See all</p>
                            </Link>
                        </div>
                        <span className="divider" />
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            {posts.slice(1, 7).map((post, index) => (
                                <Post key={index} post={post} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    )
}
