// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./public/index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         night: "#0f172a",
//         accent: "#9333ea",
//       },
//     },
//   },
//   plugins: [],
// };


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
        'lit-terra': '#C35B3A',
        'lit-cream': '#F6EFE6',
        'lit-gold': '#D9A76C',
        'lit-muted': '#BFB1A3',
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
