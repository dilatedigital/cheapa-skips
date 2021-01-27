module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#1E451A",
        secondary: "#FD6F63",
        "dark-green": "#182B33",
        "dark-grey": "#363636",
      },
      fontSize: {
        "menu-item": ["16px", "36px"],
        "phone-header": ["18px", "36px"],
      },
      ringColor: {
        primary: "#1E451A",
      },
      spacing: {
        "15px": "15px",
      },
      maxWidth: {
        "container-lg": "1675px",
        "menu-desktop": "540px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
