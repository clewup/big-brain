import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { NotificationProvider } from '@/contexts/NotificationContext/NotificationContext'
import CookiePopup from '@/lib/common/components/CookiePopup/CookiePopup'
import { LockrProvider } from '@/lib/common/contexts/LockrContext/LockrContext'
import React from 'react'
import './global.css'

export const metadata = {
    title: 'Big Brain',
    description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="blog">
            <LockrProvider>
                <NotificationProvider>
                    <body>
                        <Header />
                        <div className="min-h-screen-header">{children}</div>
                        <CookiePopup />
                        <Footer />
                    </body>
                </NotificationProvider>
            </LockrProvider>
        </html>
    )
}
