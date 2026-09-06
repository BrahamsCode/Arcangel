/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@arcangel/ui-preset")],
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: ["class", '[data-mode="dark"]'],
}
