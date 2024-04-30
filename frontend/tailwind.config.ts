import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

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
    plugins: [forms, typography],
} satisfies Config
