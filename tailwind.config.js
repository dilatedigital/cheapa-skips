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
        "content-p": ["18px", "32px"],
        "slogan-sm": ["46px", "53px"],
        "slogan-lg": ["74px", "84px"],
      },
      ringColor: {
        primary: "#1E451A",
      },
      spacing: {
        "15px": "15px",
        5.5: "22px",
        7.5: "29px",
        8.5: "33px",
        18: "75px",
        "90px": "90px",
        22: "96px",
      },
      maxWidth: {
        "container-lg": "1675px",
        "menu-desktop": "540px",
        "400px": "400px",
        "500px": "500px",
        "811px": "811px",
      },
      height: {
        "hero-lg": "625px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
