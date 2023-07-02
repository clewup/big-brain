'use client'

import { HubType } from '@/types/hubTypes'
import { motion as m, Variants } from 'framer-motion'
import Link from 'next/link'
import React, { FC } from 'react'

interface HubCardProps {
    hub: HubType
    index: number
}

const HubCard: FC<HubCardProps> = ({ hub, index }) => {
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
        <Link href={`/hubs/${hub.title}`}>
            <m.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full border-b-2 border-neutral py-5">
                <figure className="cursor-pointer">
                    <img
                        src={hub.image}
                        alt={hub.title}
                        className="aspect-video max-h-[50vh] object-cover w-full object-center rounded-md"
                    />
                </figure>

                <div className="py-2">
                    <h2 className="text-2xl font-semibold">{hub.title}</h2>
                </div>
            </m.div>
        </Link>
    )
}

export default HubCard
