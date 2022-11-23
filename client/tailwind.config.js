/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#1C1B21",
        "cart-bg-dark": "#232228",
        "main-purple": "#6C38CC",
        "secondary-purple": "#AF5DB2",
        "main-white": "#FAFAFA",
        "bg-input": "#39393F",
        "light-gray": "#434344",
      },

      fontFamily: {
        comfortaa: ["Comfortaa", "Nunito", "ui-sans-serif"],
      },
      boxShadow: {
        roundShadow: "0 0 7px",
      },
      keyframes: {
        loginLoad: {
          "0%": {
            height: "100vh",
            fontSize: "80px",
            color: "#232228",
            position: "fixed",
          },
          "60%": {
            height: "100vh",
            color: "#FAFAFA",
            fontSize: "80px",
            position: "fixed",
          },
          "100%": { height: "48px", fontSize: "20px", position: "fixed" },
        },
        cardNext: {
          "0%": {
            transform: "translateX(50px) ",
          },
          "100%": {
            transform: "translateX(0px)",
          },
        },
        cardPrev: {
          "0%": {
            transform: "translateX(-50px) ",
          },
          "100%": {
            transform: "translateX(0px)",
          },
        },
      },
      animation: {
        headerHover: "headerHover .5s ease-in-out",
        loginLoad: "loginLoad 2s ease-in-out",
        cardNext: "cardNext .2s ease-in-out",
        cardPrev: "cardPrev .2s ease-in-out",
      },
    },
  },
  plugins: [],
};
