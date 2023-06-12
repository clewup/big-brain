import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { NotificationProvider } from '@/contexts/NotificationContext/NotificationContext'
import CookiePopup from '@/lib/common/components/CookiePopup/CookiePopup'
import { LockrProvider } from '@/lib/common/contexts/LockrContext/LockrContext'
import React from 'react'
import './global.css'

export const metadata = {
    title: 'Blog',
    description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="blog">
            <LockrProvider>
                <NotificationProvider>
                    <body>
                        <div className="w-screen">
                            <Header />
                            <div className="min-h-screen-header">{children}</div>
                            <CookiePopup />
                            <Footer />
                        </div>
                    </body>
                </NotificationProvider>
            </LockrProvider>
        </html>
    )
}
