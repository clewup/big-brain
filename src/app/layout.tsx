import Header from '@/components/Header/Header'
import { NotificationProvider } from '@/contexts/NotificationContext/NotificationContext'
import { LockrProvider } from '@/lib/lockr-auth/contexts/LockrContext'
import React from 'react'
import './global.css'

export const metadata = {
    title: 'Blog',
    description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="lockr">
            <LockrProvider>
                <NotificationProvider>
                    <body>
                        <div className="w-screen">
                            <Header />
                            <div className="min-h-screen-header">{children}</div>
                        </div>
                    </body>
                </NotificationProvider>
            </LockrProvider>
        </html>
    )
}
