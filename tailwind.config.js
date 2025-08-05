/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "*.html"
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '768px',
        'desktop': '1024px',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'h1-desktop': ['140px'],
        'h1-tablet': ['120px'],
        'h1-mobile': ['44px'],
        'subtitle-desktop': ['26px', { lineHeight: '1.15' }],
        'subtitle-mobile': ['22px', { lineHeight: '1.15' }],
        'tag': ['16px', { lineHeight: '1.25' }],
      },
      colors: {
        'pure-white': '#FFFFFF',
        'vibrant-blue': '#451DC7',
        'black': '#000000',
        'energy-green': '#17B285',
        'dark-purple': '#4325C4',
      },
      backgroundImage: {
        'radial-cards': 'radial-gradient(ellipse at center, rgba(67, 37, 196, 0.1) 0%, rgba(23, 178, 133, 0.1) 100%)',
        'radial-page': 'linear-gradient(68deg,rgba(67, 37, 196, 1) 0%, rgba(23, 178, 133, 1) 100%)',
      },
      spacing: {
        'letter-spacing-tight': '-0.04em',
        'letter-spacing-tighter': '-0.05em',
      }
    },
  },
  plugins: [],
} 