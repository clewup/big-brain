'use client'

import { motion as m, Variants } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'

const Power = () => {
    const [selectedPower, setSelectedPower] = useState<Powers | null>(null)

    enum Powers {
        LifelongSkills = 'Learn lifelong skills through comprehensive knowledge sourced from industry specialists.',
        PaceYourself = 'Embark on a personalized learning journey at your own pace.',
        AccessAnywhere = 'Access knowledge conveniently on your own terms, wherever and whenever you desire.',
        Free = 'Enjoy a wealth of valuable resources, completely free of charge.',
    }

    const selectedPowerVariants: Variants = {
        exit: {
            opacity: 0,
        },
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.7,
            },
        },
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center gap-10 flex-col text-center ">
            <div className="flex flex-col gap-10 items-center">
                <h1 className="font-bold text-4xl">The power of Big Brain</h1>

                <m.div className="min-h-[10vh] flex justify-center">
                    {selectedPower && (
                        <m.p
                            key="selectedPower"
                            variants={selectedPowerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-4/5 text-neutral md:leading-[2.5rem] md:text-xl">
                            {selectedPower}
                        </m.p>
                    )}
                </m.div>
            </div>
            <div className="flex -gap-10 w-full px-5 md:px-40">
                <div
                    className="relative bg-base-200 w-full aspect-square -rotate-12 rounded-md hover:bg-primary transition-colors duration-700"
                    onMouseEnter={() => setSelectedPower(Powers.LifelongSkills)}
                    onMouseLeave={() => setSelectedPower(null)}>
                    <Image src="/images/medal.png" alt="medal" fill={true} className="h-full w-full" />
                </div>
                <div
                    className="relative bg-base-300 w-full aspect-square rotate-12 rounded-md hover:bg-primary transition-colors duration-700"
                    onMouseEnter={() => setSelectedPower(Powers.PaceYourself)}
                    onMouseLeave={() => setSelectedPower(null)}>
                    <Image src="/images/rocket.png" alt="rocket" fill={true} className="h-full w-full" />
                </div>
                <div
                    className="relative bg-base-200 w-full aspect-square -rotate-12 rounded-md hover:bg-primary transition-colors duration-700"
                    onMouseEnter={() => setSelectedPower(Powers.AccessAnywhere)}
                    onMouseLeave={() => setSelectedPower(null)}>
                    <Image src="/images/location.png" alt="location" fill={true} className="h-full w-full" />
                </div>
                <div
                    className="relative bg-base-300 w-full aspect-square rotate-12 rounded-md hover:bg-primary transition-colors duration-700"
                    onMouseEnter={() => setSelectedPower(Powers.Free)}
                    onMouseLeave={() => setSelectedPower(null)}>
                    <Image src="/images/pound.png" alt="pound" fill={true} className="h-full w-full" />
                </div>
            </div>
        </div>
    )
}

export default Power
