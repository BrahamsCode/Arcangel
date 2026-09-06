const path = require("path")

// get the path of the dependency "@arcangel/ui"
const arcangelUI = path.join(
  path.dirname(require.resolve("@arcangel/ui")),
  "**/*.{js,jsx,ts,tsx}"
)

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@arcangel/ui-preset")],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", arcangelUI],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
}
