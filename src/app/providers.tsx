'use client'

import Loader from '@/components/Loader/Loader'
import { NotificationProvider } from '@/contexts/NotificationContext/NotificationContext'
import { LockrProvider } from '@/lib/common/contexts/LockrContext/LockrContext'
import { AnimatePresence, motion as m } from 'framer-motion'
import React, { FC, ReactNode, useEffect, useState } from 'react'

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        isLoading ? document.body.classList.add('loading') : document.body.classList.remove('loading')
    }, [isLoading])

    return (
        <AnimatePresence>
            <LockrProvider>
                <NotificationProvider>
                    {isLoading ? (
                        <m.div key="loader">
                            <Loader setLoading={setLoading} />
                        </m.div>
                    ) : (
                        <>{children}</>
                    )}
                </NotificationProvider>
            </LockrProvider>
        </AnimatePresence>
    )
}

export default Providers
