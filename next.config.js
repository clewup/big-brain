// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const withFonts = require('next-fonts')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'images.unsplash.com', 'lh3.googleusercontent.com'],
    },
    reactStrictMode: true,
}

// eslint-disable-next-line no-undef
module.exports = withFonts(nextConfig)
