'use client'

import { HubType } from '@/types/hubTypes'
import cx from 'classnames'
import { motion as m, Variants } from 'framer-motion'
import Link from 'next/link'
import React, { FC } from 'react'

interface HubCardProps {
    hub: HubType
    index: number
    isDisabled?: boolean
}

const HubCard: FC<HubCardProps> = ({ hub, index, isDisabled }) => {
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

    const withDisabled = (component: JSX.Element) => {
        return isDisabled ? <div>{component}</div> : <Link href={`/hubs/${hub.title}`}>{component}</Link>
    }

    return withDisabled(
        <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full border-b-2 border-neutral py-5">
            <figure className={cx({ 'cursor-pointer': !isDisabled })}>
                <img
                    src={hub.image}
                    alt={hub.title}
                    className="aspect-video max-h-[50vh] object-cover w-full object-center rounded-md"
                />
            </figure>

            <div className="py-2">
                <h2 className="text-2xl font-semibold">{hub.title}</h2>

                <div className="pt-5">
                    {hub.features.map((feature, index) => (
                        <p key={index}>{feature}</p>
                    ))}
                </div>
            </div>
        </m.div>
    )
}

export default HubCard
