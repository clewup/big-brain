import { AuthorType } from '@/types/authorTypes'
import Avvvatars from 'avvvatars-react'
import cx from 'classnames'
import React, { FC } from 'react'
import { Award as AwardIcon } from 'react-feather'

interface AuthorProps {
    author: AuthorType
    index: number
}

const Author: FC<AuthorProps> = ({ author: { id, name, image, posts }, index }) => {
    return (
        <div className="card shadow-2xl">
            <div className="card-body">
                <figure className="w-full">
                    {image ? <img src={image} alt={name} /> : <Avvvatars value={name} size={100} />}
                </figure>
                <h1 className="card-title text-">{name}</h1>

                <span className="flex">
                    <p>{posts} posts</p>
                    <AwardIcon
                        className={cx(
                            { 'text-yellow-400': index === 0 },
                            { 'text-gray-400': index === 1 },
                            { 'text-amber-600': index === 2 }
                        )}
                    />
                </span>
            </div>
        </div>
    )
}
export default Author
