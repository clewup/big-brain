import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import Tweet from '@/components/Tweet/Tweet'
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

export default async function Home() {
    const likedTweets = await getLikedTweets()

    const posts = [
        {
            title: 'Post 1',
            image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80',
            content: '',
            categories: ['cat1', 'cat2'],
            comments: [],
        },
        {
            title: 'Post 1',
            image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80',
            content: '',
            categories: ['cat1', 'cat2'],
            comments: [],
        },
        {
            title: 'Post 1',
            image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80',
            content: '',
            categories: ['cat1', 'cat2'],
            comments: [],
        },
    ]

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
            <div className="w-full">
                <div className="grid grid-cols-3 w-full gap-5">
                    {posts.map((post, index) => (
                        <Post key={index} post={post} isLatest={index === 0} />
                    ))}
                </div>
            </div>
        </PageWrapper>
    )
}
