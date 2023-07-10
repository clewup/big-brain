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
                    'base-100': '#eeeeee',
                    error: '#d9534f',
                    info: '#0277cc',
                    neutral: '#9ca3af',
                    primary: '#fe416d',
                    secondary: '#9ca3af',
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
                'screen-header': '90vh',
            },
            minHeight: {
                'screen-header': '90vh',
            },
        },
    },
}
