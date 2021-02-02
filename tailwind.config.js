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
        "circle-bg": "#0a6259",
      },
      fontSize: {
        "menu-item": ["16px", "36px"],
        "phone-header": ["18px", "36px"],
        "content-p": ["18px", "32px"],
        "bin-title": ["22px", "23px"],
        "specs-p": ["18px", "30px"],
        "h3-sm": ["28px", "48px"],
        "h3-lg": ["38px", "48px"],
        "slogan-sm": ["46px", "53px"],
        "slogan-lg": ["74px", "84px"],
      },
      ringColor: {
        primary: "#1E451A",
      },
      spacing: {
        "15px": "15px",
        5.5: "22px",
        7.5: "30px",
        8.5: "33px",
        18: "75px",
        "90px": "90px",
        22: "96px",
      },
      maxWidth: {
        "logo-sm": "75px",
        "container-lg": "1675px",
        "menu-desktop": "540px",
        "270px": "270px",
        "400px": "400px",
        "500px": "500px",
        "725px": "725px",
        "811px": "811px",
      },
      height: {
        "hero-lg": "625px",
        "bin-img": "247px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
