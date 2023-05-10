const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Garamond', ...defaultTheme.fontFamily.sans],
                chomsky: ['Chomsky', 'sans'],
                satisfice: ['Satisfice', 'sans'],
                steelfish: ['Steelfish', 'sans'],
                abaddon: ['Abaddon', 'sans'],
            },
            height: {
                'screen-header': '75vh',
            },
            minHeight: {
                'screen-header': '75vh',
            },
            colors: {
                branding: {
                    beige: '#f8fcda',
                    black: '#111111',
                },
            },
        },
    },
    plugins: [],
}
