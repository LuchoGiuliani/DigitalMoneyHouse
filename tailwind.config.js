/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "color-primary": "#C1FD35",
        "color-darker": "#201F22",
        "color-dark": "#3A393E",
        "color-gray": "#EEEAEA",
      },
      maxWidth:{
        "desktop": "1440px",
        "tablet": "834px",
        "mobile": "390px",
      }
    },
  },
  plugins: [],
};
