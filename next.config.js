const withFonts = require('next-fonts')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com', 'images.unsplash.com'],
    },
}

module.exports = withFonts(nextConfig)
