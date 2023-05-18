import { TweetType } from '@/types/twitterTypes'

export function mapLikedTweet(apiData: any): TweetType {
    const mappedTweet: TweetType = {
        author: apiData.author_id,
        createdAt: apiData.created_at,
        image: apiData.entities?.urls?.length > 0 ? apiData.entities.urls[0].display_url : '',
        language: apiData.lang,
        metrics: {
            retweets: apiData.public_metrics.retweet_count,
            replies: apiData.public_metrics.reply_count,
            likes: apiData.public_metrics.like_count,
            quoteRetweets: apiData.public_metrics.quote_count,
            impressions: apiData.public_metrics.impression_count,
        },
        text: apiData.text,
        url: apiData.entities?.urls?.length > 0 ? apiData.entities.urls[0]?.url : '',
    }

    return mappedTweet
}

export function mapLikedTweets(apiData: any): TweetType[] {
    const likedTweets = apiData.data as Array<any>

    return likedTweets?.map((likedTweet) => mapLikedTweet(likedTweet))
}
