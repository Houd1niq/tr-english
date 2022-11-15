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
      },

      fontFamily: {
        comfortaa: ["Comfortaa", "Nunito", "ui-sans-serif"],
      },
      keyframes: {
        headerHover: {
          "0%": {
            before: true,
          },
        },
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
      },
      animation: {
        headerHover: "headerHover .5s ease-in-out",
        loginLoad: "loginLoad 2s ease-in-out",
      },
    },
  },
  plugins: [],
};
