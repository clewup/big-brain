import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className="w-full justify-between py-5 px-40 text-lg">
            <Link href="/privacy">Privacy Policy</Link>
        </div>
    )
}

export default Footer
