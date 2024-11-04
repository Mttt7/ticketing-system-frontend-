/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],

 daisyui: {
    themes: [{
      bumblebee:{
        ...require("daisyui/src/theming/themes")["bumblebee"],
        "primary":"#0d72f4",
        "base-100":"#f3f4f6"
      }

    }],
  },
}

