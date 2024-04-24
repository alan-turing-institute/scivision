/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                scipurple: {
                    light: '#E0E7FF',
                    DEFAULT: '#8B62CF',
                    dark: '#7843cf',
                },
            },
            fontFamily: {
                sans: [
                    '"Source Sans 3 Variable"',
                    ...defaultTheme.fontFamily.sans,
                ],
                mono: [
                    '"Source Code Pro Variable"',
                    ...defaultTheme.fontFamily.mono,
                ],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
