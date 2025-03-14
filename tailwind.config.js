/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@subframe/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "rgb(250, 250, 250)",
          100: "rgb(245, 245, 245)",
          200: "rgb(229, 229, 229)",
          300: "rgb(212, 212, 212)",
          400: "rgb(163, 163, 163)",
          500: "rgb(115, 115, 115)",
          600: "rgb(38, 38, 38)",
          700: "rgb(64, 64, 64)",
          800: "rgb(38, 38, 38)",
          900: "rgb(23, 23, 23)",
        },
        neutral: {
          0: "rgb(255, 255, 255)",
          50: "rgb(249, 250, 251)",
          100: "rgb(243, 244, 246)",
          200: "rgb(229, 231, 235)",
          300: "rgb(209, 213, 219)",
          400: "rgb(156, 163, 175)",
          500: "rgb(107, 114, 128)",
          600: "rgb(75, 85, 99)",
          700: "rgb(55, 65, 81)",
          800: "rgb(31, 41, 55)",
          900: "rgb(17, 24, 39)",
          950: "rgb(3, 7, 18)",
        },
        error: {
          50: "rgb(254, 242, 242)",
          100: "rgb(254, 226, 226)",
          200: "rgb(254, 202, 202)",
          300: "rgb(252, 165, 165)",
          400: "rgb(248, 113, 113)",
          500: "rgb(239, 68, 68)",
          600: "rgb(220, 38, 38)",
          700: "rgb(185, 28, 28)",
          800: "rgb(153, 27, 27)",
          900: "rgb(127, 29, 29)",
        },
        warning: {
          50: "rgb(255, 251, 235)",
          100: "rgb(254, 243, 199)",
          200: "rgb(253, 230, 138)",
          300: "rgb(252, 211, 77)",
          400: "rgb(251, 191, 36)",
          500: "rgb(245, 158, 11)",
          600: "rgb(217, 119, 6)",
          700: "rgb(180, 83, 9)",
          800: "rgb(146, 64, 14)",
          900: "rgb(120, 53, 15)",
        },
        success: {
          50: "rgb(240, 253, 250)",
          100: "rgb(204, 251, 241)",
          200: "rgb(153, 246, 228)",
          300: "rgb(94, 234, 212)",
          400: "rgb(45, 212, 191)",
          500: "rgb(20, 184, 166)",
          600: "rgb(13, 148, 136)",
          700: "rgb(15, 118, 110)",
          800: "rgb(17, 94, 89)",
          900: "rgb(19, 78, 74)",
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['30px', {
          lineHeight: '36px',
          fontWeight: '500',
          letterSpacing: '0em'
        }],
        'heading-2': ['20px', {
          lineHeight: '24px',
          fontWeight: '500',
          letterSpacing: '0em'
        }],
        'heading-3': ['16px', {
          lineHeight: '20px',
          fontWeight: '500',
          letterSpacing: '0em'
        }],
        'body': ['14px', {
          lineHeight: '20px',
          fontWeight: '400',
          letterSpacing: '0em'
        }],
        'body-bold': ['14px', {
          lineHeight: '20px',
          fontWeight: '500',
          letterSpacing: '0em'
        }],
        'caption': ['12px', {
          lineHeight: '16px',
          fontWeight: '400',
          letterSpacing: '0em'
        }],
        'caption-bold': ['12px', {
          lineHeight: '16px',
          fontWeight: '500',
          letterSpacing: '0em'
        }]
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
