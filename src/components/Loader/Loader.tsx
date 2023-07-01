import { motion as m, Variants } from 'framer-motion'
import Image from 'next/image'
import React, { Dispatch, FC, SetStateAction } from 'react'

interface LoaderProps {
    setLoading: Dispatch<SetStateAction<boolean>>
}

const Loader: FC<LoaderProps> = ({ setLoading }) => {
    const containerVariants: Variants = {
        initial: { opacity: 1 },
        animate: { opacity: 1, transition: { duration: 2 } },
    }

    const imageVariants: Variants = {
        hidden: { y: 1000 },
        visible: { y: 0, transition: { duration: 1.5 } },
    }

    return (
        <m.div
            className="w-full h-screen flex justify-center items-center"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            onAnimationComplete={() => setLoading(false)}>
            <m.div variants={imageVariants} initial="hidden" animate="visible" layoutId="logo">
                <Image
                    src="https://res.cloudinary.com/dliog6kq6/image/upload/v1688161397/Logo_jewaxq.png"
                    alt="logo"
                    width={150}
                    height={30}
                />
            </m.div>
        </m.div>
    )
}

export default Loader
