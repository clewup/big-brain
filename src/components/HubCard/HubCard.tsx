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
    const delay = index * 0.1

    const containerVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 75,
        },
        visible: {
            opacity: 1,
            transition: {
                delay: delay, // staggers the animation for 0.3 seconds
                duration: 0.5,
                type: 'spring',
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
            className="w-full flex h-full rounded-md bg-white flex-col md:flex-row">
            <figure className={cx('md:w-2/3', { 'cursor-pointer': !isDisabled })}>
                <img
                    src={hub.image}
                    alt={hub.title}
                    className="h-full object-cover w-full object-center rounded-tl-md rounded-tr-md md:rounded-tr-none md:rounded-bl-md"
                />
            </figure>

            <div className="py-2 flex flex-col justify-center p-5 md:w-1/3">
                <h2 className="text-2xl font-semibold">{hub.title}</h2>

                {hub.features.length > 0 && (
                    <div className="pt-5">
                        <h1 className="uppercase font-semibold text-neutral">FEATURES</h1>
                        {hub.features.map((feature, index) => (
                            <p key={index}>{feature}</p>
                        ))}
                    </div>
                )}
            </div>
        </m.div>
    )
}

export default HubCard
