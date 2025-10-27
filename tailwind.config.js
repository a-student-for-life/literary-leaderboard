


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lit-brown': '#5B3926',
        'dark-brown': '#302113ff',
        'lit-terra': '#C35B3A',
        'dark-terra': '#8E3F29',
        'lit-cream': '#F6EFE6',
        'lit-gold': '#D9A76C',
        'lit-muted': '#BFB1A3',
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
         header: ["'Playfair Display'", "serif"],
        tagline: ["'Dancing Script'", "cursive"],
        body: ["'Lora'", "serif"],
        ui: ["'Poppins'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
