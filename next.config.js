// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const withFonts = require('next-fonts')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com', 'images.unsplash.com', 'lh3.googleusercontent.com'],
    },
}

// eslint-disable-next-line no-undef
module.exports = withFonts(nextConfig)
