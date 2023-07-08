'use client'

import { GuideType } from '@/types/guideTypes'
import moment from 'moment'
import Link from 'next/link'
import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'

interface GuideProps {
    guide: GuideType
}

const Guide: FC<GuideProps> = ({ guide }) => {
    return (
        <div>
            <figure>
                <img
                    src={guide.image}
                    alt={guide.title}
                    className="aspect-video max-h-[50vh] object-cover w-full object-center rounded-md"
                />
            </figure>

            <div className="py-2">
                <h2 className="text-4xl py-5 font-semibold">{guide.title}</h2>

                <div className="flex flex-col pb-10">
                    <div className="justify-start py-2">
                        {guide.categories.map((category, index) => (
                            <Link
                                href={`/search?category=${category}`}
                                key={index}
                                className="font-semibold text-primary">
                                {category}
                            </Link>
                        ))}
                    </div>

                    <p className="text-lg text-neutral">{moment(guide.createdAt).format('DD/MM/YYYY')}</p>
                </div>

                {guide.sections.map((guideSection, index) => (
                    <div key={index} className="pb-10">
                        <h1 className="pb-5 text-2xl">{guideSection.title}</h1>

                        <ReactMarkdown>{guideSection.content}</ReactMarkdown>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Guide
