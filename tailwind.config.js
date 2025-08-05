/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'h1-desktop': ['140px', {
          lineHeight: '140px',
          letterSpacing: '-0.04em',
          fontWeight: '300',
        }],
        'h1-mobile': ['44px', {
          lineHeight: '50px',
          letterSpacing: '-0.05em',
          fontWeight: '300',
        }],
        'subtitle-desktop': ['26px', {
          lineHeight: '30px',
          letterSpacing: '-0.05em',
          fontWeight: '400',
        }],
        'subtitle-mobile': ['22px', {
          lineHeight: '30px',
          letterSpacing: '-0.05em',
          fontWeight: '400',
        }],
        'tag': ['16px', {
          lineHeight: '20px',
          letterSpacing: '0.05em',
          fontWeight: '500',
          textTransform: 'uppercase',
        }],
      },
      colors: {
        'pure-white': '#FFFFFF',
        'vibrant-blue': '#451DC7',
        'black': '#111111',
        'energy-green': '#04F06A',
        'dark-purple': '#250F6B',
      },
      backgroundImage: {
        'radial-cards': 'radial-gradient(104.71% 432.93% at 29.43% 37.21%, #451DC7 0%, #250F6B 100%)',
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