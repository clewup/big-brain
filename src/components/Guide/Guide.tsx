'use client'

import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { GuideType } from '@/types/guideTypes'
import cx from 'classnames'
import moment from 'moment'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface GuideProps {
    guide: GuideType
}

const Guide: FC<GuideProps> = ({ guide }) => {
    const { queryParams, setQueryParams } = useQueryParams<{ section: number }>()

    const [activeSection, setActiveSection] = useState(guide.sections[0])

    useEffect(() => {
        const { section } = queryParams

        if (section && section <= guide.sections.length) {
            setActiveSection(guide.sections[section])
        }
    }, [queryParams])

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

                <div className="relative min-h-[50vh]">
                    <ReactMarkdown>{activeSection.content}</ReactMarkdown>

                    <div className="btn-group absolute bottom-0 right-0 mb-5">
                        {Array.from({ length: guide.sections.length }, (_, index) => index + 1).map(
                            (pageNumber, index) => {
                                return (
                                    <button
                                        key={index}
                                        className={cx('btn text-white', {
                                            'btn-active': pageNumber === guide.sections.indexOf(activeSection) + 1,
                                        })}
                                        onClick={() => {
                                            const updatedQuery = { ...queryParams, section: pageNumber }
                                            setQueryParams(updatedQuery)
                                        }}
                                        disabled={guide.sections.length === 1}>
                                        {pageNumber}
                                    </button>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Guide
