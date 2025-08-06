/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "*.html"],
  theme: {
    extend: {
      screens: {
        tablet: "768px",
        laptop: "1024px",
        desktop: "1316px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "h1-desktop": ["140px"],
        "h1-tablet": ["120px"],
        "h1-mobile": ["44px"],
        "h2-large": ["50px", { lineHeight: "60px" }],
        "subtitle-desktop": ["26px", { lineHeight: "1.15" }],
        "subtitle-mobile": ["22px", { lineHeight: "1.15" }],
        tag: ["16px", { lineHeight: "20px" }],
      },
      colors: {
        "pure-white": "#FFFFFF",
        "vibrant-blue": "#451DC7",
        black: "#000000",
        "energy-green": "#04F06A",
        "dark-purple": "#4325C4",
      },
      backgroundImage: {
        "radial-cards":
          "radial-gradient(104.71% 432.93% at 29.43% 37.21%, #451DC7 0%, #250F6B 100%)",
        "radial-page":
          "linear-gradient(86deg, #4325C4 12%, #3357AE 50%, #17B285 100%)",
      },
      spacing: {
        "letter-spacing-tight": "-0.04em",
        "letter-spacing-tighter": "-0.05em",
      },
    },
  },
  plugins: [],
};
