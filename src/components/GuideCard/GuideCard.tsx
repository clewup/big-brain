'use client'

import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { GuideType } from '@/types/guideTypes'
import { motion as m, Variants } from 'framer-motion'
import moment from 'moment/moment'
import Link from 'next/link'
import React, { FC } from 'react'

interface GuideCardProps {
    guide: GuideType
    index: number
}

const GuideCard: FC<GuideCardProps> = ({ guide, index }) => {
    const { setQueryParams } = useQueryParams()

    const delay = index * 0.05

    const containerVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 75,
        },
        visible: {
            opacity: 1,
            transition: {
                delay: delay, // staggers the animation for 0.3 seconds
            },
            y: 0,
        },
    }

    return (
        <m.div
            className="w-full border-b-2 border-neutral py-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            <figure
                onClick={() => setQueryParams({ guide: guide.title }, `hubs/${guide.hub}`)}
                className="cursor-pointer">
                <img
                    src={guide.image}
                    alt={guide.title}
                    className="aspect-video max-h-[50vh] object-cover w-full object-center rounded-md"
                />
            </figure>
            <div className="py-2">
                <h2 className="text-2xl font-semibold">{guide.title}</h2>

                <div className="justify-start pb-4 flex flex-col">
                    {guide.categories.map((category, index) => (
                        <Link href={`/search?category=${category}`} key={index} className="font-semibold text-primary">
                            {category}
                        </Link>
                    ))}
                </div>

                <p className="text-lg text-neutral">{moment(guide.createdAt).format('DD/MM/YYYY')}</p>
            </div>
        </m.div>
    )
}

export default GuideCard
