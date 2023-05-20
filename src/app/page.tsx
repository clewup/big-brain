import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import Tweet from '@/components/Tweet/Tweet'
import prisma from '@/lib/prisma'
import { mapLikedTweets } from '@/utils/mappers/tweetMapper'
import Link from 'next/link'
import React from 'react'
import { ArrowRightCircle as NextIcon } from 'react-feather'

async function getLikedTweets() {
    const params = 'tweet.fields=lang,author_id,created_at,public_metrics,entities&media.fields=url,height'
    const twitterResponse = await fetch(
        `https://api.twitter.com/2/users/${process.env.TWITTER_USER_ID}/liked_tweets?${params}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        }
    )
    const twitterData = await twitterResponse.json()
    return mapLikedTweets(twitterData)
}

async function getPosts() {
    return prisma.post.findMany({ orderBy: { createdAt: 'desc' }, take: 6 })
}

export default async function Home() {
    const likedTweets = await getLikedTweets()
    const posts = await getPosts()

    return (
        <PageWrapper className="flex">
            <div className="w-1/4 h-full">
                <h1 className="text-8xl font-satisfice">THE LATEST</h1>
                <span className="flex flex-col gap-5">
                    {likedTweets?.slice(0, 5).map((likedTweet, index) => (
                        <Tweet key={index} tweet={likedTweet} />
                    ))}
                </span>
            </div>
            <span className="divider divider-horizontal" />
            <div className="w-full flex flex-col gap-10">
                <div>
                    <h1 className="text-8xl font-satisfice">THIS JUST IN</h1>
                    <Post post={posts[0]} isLatest={true} />
                </div>
                <div>
                    <h1 className="text-8xl font-satisfice">IN OTHER NEWS</h1>
                    <div className="grid grid-cols-3 grid-rows-2 gap-5">
                        {posts.slice(1, 6).map((post, index) => (
                            <Post key={index} post={post} />
                        ))}
                        <Link
                            href={'/posts'}
                            className="h-full w-full flex flex-col justify-center items-center text-2xl gap-5">
                            <NextIcon size={40} />
                            <p>View More</p>
                        </Link>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
