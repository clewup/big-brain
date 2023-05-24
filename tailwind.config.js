// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
                chomsky: ['Chomsky', 'sans'],
                satisfice: ['Satisfice', 'sans'],
                steelfish: ['Steelfish', 'sans'],
                abaddon: ['Abaddon', 'sans'],
            },
            height: {
                'screen-header': '92vh',
            },
            minHeight: {
                'screen-header': '92vh',
            },
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: [
            {
                blog: {
                    primary: '#3a86ff',
                    secondary: '#FF1654',
                    accent: '#1FB2A5',
                    neutral: '#CCCCCC',
                    'base-100': '#FFFFFF',
                    info: '#3ABFF8',
                    success: '#198754',
                    warning: '#FBBD23',
                    error: '#d9534f',
                },
            },
        ],
    },
}
