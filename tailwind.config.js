// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    daisyui: {
        themes: [
            {
                blog: {
                    'base-100': '#FFFFFF',
                    error: '#d9534f',
                    info: '#3ABFF8',
                    neutral: '#9ca3af',
                    primary: '#fe416d',
                    secondary: '#7bf6f2',
                    success: '#198754',
                    warning: '#FBBD23',
                },
            },
        ],
    },
    // eslint-disable-next-line no-undef
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    theme: {
        extend: {
            fontFamily: {
                palatino: ['Palatino', 'sans'],
                sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
            },
            height: {
                'screen-header': '92vh',
            },
            minHeight: {
                'screen-header': '92vh',
            },
        },
    },
}
