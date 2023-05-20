import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import Tweet from '@/components/Tweet/Tweet'
import prisma from '@/lib/prisma'
import { mapLikedTweets } from '@/utils/mappers/tweetMapper'
import React from 'react'

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
    return prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
}

export default async function Home() {
    const likedTweets = await getLikedTweets()
    const posts = await getPosts()

    return (
        <PageWrapper className="flex">
            <div className="w-1/4 h-full min-h-screen-header">
                <h1 className="text-6xl font-satisfice">THE LATEST</h1>
                <span className="flex flex-col gap-5">
                    {likedTweets?.slice(0, 5).map((likedTweet, index) => (
                        <Tweet key={index} tweet={likedTweet} />
                    ))}
                </span>
            </div>
            <span className="divider divider-horizontal" />
            <div className="w-full flex flex-col gap-5">
                <div>
                    <h1 className="text-6xl font-satisfice">IN OTHER NEWS</h1>
                    <div className="grid grid-cols-3 w-full mt-5 gap-5">
                        {posts.map((post, index) => (
                            <Post key={index} post={post} isLatest={index === 0} />
                        ))}
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
