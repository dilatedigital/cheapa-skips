module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "indigo-lighter": "#b3bcf5",
        indigo: "#5c6ac4",
        "indigo-dark": "#202e78",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
