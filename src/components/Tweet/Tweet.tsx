import { TweetType } from '@/types/twitterTypes'
import { FC } from 'react'

interface TweetProps {
    tweet: TweetType
}

const Tweet: FC<TweetProps> = ({ tweet }) => {
    return (
        <div>
            <p>{tweet.text}</p>
        </div>
    )
}

export default Tweet
