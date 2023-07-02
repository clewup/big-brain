import Providers from '@/app/providers'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import CookiePopup from '@/lib/common/components/CookiePopup/CookiePopup'
import React from 'react'
import './global.css'

export const metadata = {
    title: 'Big Brain',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="blog">
            <body>
                <Providers>
                    <Header />
                    <div className="min-h-screen-header">{children}</div>
                    <CookiePopup />
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
