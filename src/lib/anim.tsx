import React from 'react';

export const slideLeft = {
    initial: { x: 40 },
    animate: { x: 0 },
    exit: { x: 40 },
    transition: {
        duration: 0.7,
        type: 'spring',
        stiffness: 260,
        damping: 12,
    },
};

export const slideRight = {
    initial: { x: -40 },
    animate: { x: 0 },
    exit: { x: -40 },
    transition: {
        duration: 0.7,
        type: 'spring',
        stiffness: 260,
        damping: 12,
    },
};

export const slideUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 60, opacity: 0 },
};

export const slideDown = {
    initial: { y: -40 },
    animate: { y: 0 },
    exit: { y: -40 },
};
