/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                space: {
                    950: '#00010a',
                    900: '#020617',
                    800: '#0a0f23',
                    700: '#0f172a',
                    600: '#1e293b',
                },
                cyan: {
                    400: '#22d3ee',
                    300: '#67e8f9',
                    200: '#a5f3fc',
                },
                electric: '#00f5ff',
                nebula: '#0ea5e9',
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'spin-slower': 'spin 40s linear infinite',
                'pulse-slow': 'pulse 4s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'typing': 'typing 3.5s steps(40, end)',
                'blink': 'blink .75s step-end infinite',
                'orbit': 'orbit 8s linear infinite',
                'orbit-reverse': 'orbit-reverse 12s linear infinite',
                'twinkle': 'twinkle 3s ease-in-out infinite',
                'scanner': 'scanner 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    from: { textShadow: '0 0 10px #22d3ee, 0 0 20px #22d3ee' },
                    to: { textShadow: '0 0 20px #22d3ee, 0 0 40px #22d3ee, 0 0 60px #22d3ee' },
                },
                orbit: {
                    from: { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
                    to: { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
                },
                'orbit-reverse': {
                    from: { transform: 'rotate(360deg) translateX(160px) rotate(-360deg)' },
                    to: { transform: 'rotate(0deg) translateX(160px) rotate(0deg)' },
                },
                twinkle: {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '0.3', transform: 'scale(0.8)' },
                },
                scanner: {
                    '0%, 100%': { opacity: '0.3' },
                    '50%': { opacity: '1' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.1)',
                'glow-blue': '0 0 20px rgba(14, 165, 233, 0.4), 0 0 40px rgba(14, 165, 233, 0.1)',
                'inner-glow': 'inset 0 0 30px rgba(34, 211, 238, 0.05)',
            },
        },
    },
    plugins: [],
};
