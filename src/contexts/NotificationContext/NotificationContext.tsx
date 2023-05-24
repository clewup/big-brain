'use client'

import Toast from '@/components/Toast/Toast'
import { NotificationType } from '@/types/notificationTypes'
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

type NotificationContextValues = {
    pushNotification: (notification: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextValues>({} as NotificationContextValues)

interface NotificationProviderProps {
    children: ReactNode
}

const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
    const [currentNotification, setCurrentNotification] = useState<NotificationType | null>(null)
    const [notificationQueue, setNotificationQueue] = useState<NotificationType[]>([])
    const [isTiming, setTiming] = useState(false)

    useEffect(() => {
        if (!currentNotification && notificationQueue.length > 0) {
            setCurrentNotification(notificationQueue[0])
            setNotificationQueue(notificationQueue.slice(1, notificationQueue.length))
        }
        if (currentNotification && !isTiming) {
            setTiming(true)
            setTimeout(() => {
                setTiming(false)
                setCurrentNotification(null)
                currentNotification.callback?.()
            }, 4000)
        }
    }, [notificationQueue, currentNotification])

    function pushNotification(notification: NotificationType) {
        setNotificationQueue((prev) => [...prev, notification])
    }

    return (
        <NotificationContext.Provider value={{ pushNotification }}>
            {currentNotification && <Toast text={currentNotification.text} variant={currentNotification.variant} />}
            {children}
        </NotificationContext.Provider>
    )
}

const useNotification = () => {
    const context = useContext(NotificationContext)

    if (!context) {
        throw new Error('useNotification may only be used within the NotificationContext')
    }

    return context
}

export { NotificationProvider, useNotification }
