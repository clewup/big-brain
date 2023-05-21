'use client'

import cx from 'classnames'
import React, { FC, useEffect, useState } from 'react'

interface ToastProps {
    text: string
    variant?: 'success' | 'info' | 'error' | 'warning'
    callback?: () => void
}

const Toast: FC<ToastProps> = ({ text, variant = 'success', callback }) => {
    const [isRendered, setRendered] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setRendered(false)
            callback?.()
        }, 4000)
    }, [])

    if (!isRendered) {
        return null
    }

    return (
        <div className="toast">
            <div
                className={cx(
                    'alert',
                    { 'alert-success': variant === 'success' },
                    { 'alert-error': variant === 'error' },
                    { 'alert-warning': variant === 'warning' },
                    { 'alert-info': variant === 'info' }
                )}>
                <div>
                    <span>{text}</span>
                </div>
            </div>
        </div>
    )
}

export default Toast
