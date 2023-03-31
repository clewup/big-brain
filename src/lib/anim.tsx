import { motion } from 'framer-motion';
import React from 'react';

interface ISlideXProps {
    children: JSX.Element;
    direction: "left" | "right";
    distance: number;
    className?: string;
}
export const SlideX: React.FC<ISlideXProps> = ({children, direction, distance, className}) => {
    const formattedDistance = direction === "left" ? distance : -distance;
    return (
        <motion.div
            initial={{ x: formattedDistance }}
            animate={{ x: 0 }}
            exit={{ x: formattedDistance }}
            transition={{
                duration: 0.7,
                type: 'spring',
                stiffness: 260,
                damping: 12,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface ISlideYProps {
    children: JSX.Element;
    direction: "up" | "down";
    distance: number;
    className?: string;
}
export const SlideY: React.FC<ISlideYProps> = ({children, direction, distance, className}) => {
    const formattedDistance = direction === "up" ? distance : -distance;
    return (
        <motion.div
            initial={{ y: formattedDistance }}
            animate={{ y: 0 }}
            exit={{ y: formattedDistance }}
            transition={{
                duration: 0.7,
                type: 'spring',
                stiffness: 260,
                damping: 12,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}