import cx from 'classnames'
import React, { FC } from 'react'

interface ToastProps {
    text: string
    variant?: 'success' | 'info' | 'error' | 'warning'
}

const Toast: FC<ToastProps> = ({ text, variant = 'success' }) => {
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
