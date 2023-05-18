export type TweetType = {
    text: string
    createdAt: string
    metrics: TwitterMetrics
    language: string
    image: string
    url: string
    author: string
}

type TwitterMetrics = {
    retweets: number
    replies: number
    likes: number
    quoteRetweets: number
    impressions: number
}

export type TwitterUserType = {
    id: string
    image: string
    username: string
    name: string
}
