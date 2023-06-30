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
                palatino: ['Palatino', 'sans'],
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
                    primary: '#fe416d',
                    secondary: '#7bf6f2',
                    neutral: '#9ca3af',
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
