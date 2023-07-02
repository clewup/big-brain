import cx from 'classnames'
import React, { FC } from 'react'

type ModalButtonType = {
    text: string
    onClick?: () => void
    variant?: 'success' | 'neutral' | 'warning' | 'error'
}

interface ModalProps {
    id: string
    isOpen: boolean
    title: string
    text?: string
    buttons: ModalButtonType[]
}

const Modal: FC<ModalProps> = ({ buttons, id, isOpen, text, title }) => {
    return (
        <>
            <input type="checkbox" id={id} className="modal-toggle" checked={isOpen} onChange={() => null} />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{text}</p>
                    <div className="modal-action">
                        {buttons.map((button, index) => {
                            if (button.onClick) {
                                return (
                                    <button
                                        key={index}
                                        onClick={button.onClick}
                                        className={cx(
                                            'btn',
                                            { 'btn-success': button.variant === 'success' },
                                            {
                                                'btn-neutral': button.variant === 'neutral',
                                            },
                                            {
                                                'btn-warning': button.variant === 'warning',
                                            },
                                            {
                                                'btn-error': button.variant === 'error',
                                            }
                                        )}>
                                        {button.text}
                                    </button>
                                )
                            } else {
                                return (
                                    <label key={index} htmlFor={id} className="btn">
                                        Close
                                    </label>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
