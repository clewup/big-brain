import Header from '@/components/atoms/Header/Header'
import React from 'react'
import './global.css'

export const metadata = {
    title: 'Blog',
    description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className="w-screen bg-branding-beige p-2">
                    <Header />
                    <div className="min-h-screen-header">{children}</div>
                </div>
            </body>
        </html>
    )
}
