'use client'

import { Guide } from '@prisma/client'
import { motion as m, Variants } from 'framer-motion'
import moment from 'moment/moment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface GuideCardProps {
    guide: Guide
    index: number
}

const GuideCard: FC<GuideCardProps> = ({ guide, index }) => {
    const router = useRouter()
    const delay = index * 0.05

    const containerVariants: Variants = {
        hidden: {
            y: 75,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay: delay, // staggers the animation for 0.3 seconds
            },
        },
    }

    return (
        <m.div
            className="w-full border-b-2 border-neutral py-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            <figure onClick={() => router.push(`/guide/${guide.id}`)} className="cursor-pointer">
                <img
                    src={guide.image}
                    alt={guide.title}
                    className="aspect-video max-h-[50vh] object-cover w-full object-center rounded-md"
                />
            </figure>
            <div className="py-2">
                <h2 className="text-2xl font-semibold">{guide.title}</h2>

                <div className="justify-start pb-4">
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
