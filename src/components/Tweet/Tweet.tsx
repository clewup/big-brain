import { TweetType } from '@/types/twitterTypes'
import moment from 'moment'
import { FC } from 'react'
import {
    BarChart2 as ImpressionsIcon,
    Heart as LikeIcon,
    MessageSquare as RepliesIcon,
    RotateCw as RetweetIcon,
} from 'react-feather'

interface TweetProps {
    tweet: TweetType
}

const Tweet: FC<TweetProps> = ({ tweet }) => {
    return (
        <div className="rounded-2xl shadow-xl p-5 flex flex-col gap-2">
            <p>{tweet.text.substring(0, 100)}</p>
            <p className="text-neutral">{moment(tweet.createdAt).format('DD/MM/YYYY')}</p>
            <div className="flex gap-3 text-neutral mt-2">
                <span className="flex gap-1">
                    <RetweetIcon />
                    {tweet.metrics.retweets}
                </span>
                <span className="flex gap-1">
                    <LikeIcon />
                    {tweet.metrics.likes}
                </span>
                <span className="flex gap-1">
                    <RepliesIcon />
                    {tweet.metrics.replies}
                </span>
                <span className="flex gap-1">
                    <ImpressionsIcon />
                    {tweet.metrics.impressions}
                </span>
            </div>
        </div>
    )
}

export default Tweet
