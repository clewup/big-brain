import { motion as m, Variants } from 'framer-motion'
import Image from 'next/image'
import React, { Dispatch, FC, SetStateAction } from 'react'

interface LoaderProps {
    setLoading: Dispatch<SetStateAction<boolean>>
}

const Loader: FC<LoaderProps> = ({ setLoading }) => {
    const containerVariants: Variants = {
        animate: { opacity: 1, transition: { duration: 2 } },
        initial: { opacity: 1 },
    }

    const imageVariants: Variants = {
        exit: {
            opacity: 0,
        },
        hidden: { y: 1000 },
        visible: {
            transition: {
                duration: 1,
                type: 'spring',
            },
            y: 0,
        },
    }

    const blockVariants: Variants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 1.2,
            },
        },
    }

    return (
        <m.div
            className="w-full h-screen flex justify-center items-center"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationComplete={() => setLoading(false)}>
            <m.div
                variants={blockVariants}
                initial="hidden"
                animate="visible"
                className="bg-base-100 w-full h-full absolute z-50"
            />

            <m.div variants={imageVariants} initial="hidden" animate="visible">
                <Image
                    src="https://res.cloudinary.com/dliog6kq6/image/upload/v1688161397/Logo_jewaxq.png"
                    alt="logo"
                    width={200}
                    height={30}
                />
            </m.div>
        </m.div>
    )
}

export default Loader
