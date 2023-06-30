'use client'

import { AuthorType } from '@/types/authorTypes'
import Avvvatars from 'avvvatars-react'
import cx from 'classnames'
import React, { FC } from 'react'
import { Award as AwardIcon } from 'react-feather'

interface AuthorProps {
    author: AuthorType
    index: number
}

const Author: FC<AuthorProps> = ({ author: { name, image, posts }, index }) => {
    return (
        <div className="border-b-2 border-neutral">
            <div className="flex flex-col gap-5 aspect-square items-center justify-center">
                <figure className="w-full flex justify-center">
                    {image ? <img src={image} alt={name} /> : <Avvvatars value={name} size={100} />}
                </figure>

                <div className="flex flex-col items-center gap-2">
                    <h1 className="card-title text-">{name}</h1>
                    <span className="flex gap-1">
                        <AwardIcon
                            className={cx(
                                { 'text-yellow-400': index === 0 },
                                { 'text-gray-400': index === 1 },
                                { 'text-amber-600': index === 2 }
                            )}
                        />
                        <p>{posts} posts</p>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Author
