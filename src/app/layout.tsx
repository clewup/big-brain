import React from 'react';
import './global.css';

export const metadata = {
    title: 'Blog',
    description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen w-screen bg-branding-beige">{children}</div>
            </body>
        </html>
    );
}
