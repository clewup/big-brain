import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className="w-full text-lg flex justify-center py-5 md:px-40 md:justify-between">
            <Link href="/privacy">Privacy Policy</Link>
        </div>
    )
}

export default Footer
