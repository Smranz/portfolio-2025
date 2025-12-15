/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#8b5cf6',
                    dark: '#7c3aed',
                },
                secondary: {
                    DEFAULT: '#06b6d4',
                    dark: '#0891b2',
                },
            },
            fontFamily: {
                outfit: ['var(--font-outfit)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
