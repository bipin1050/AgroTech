module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors:{
        'primary': '#D9D9D9',
        'secondary' : '#000000'
      },
      screens: {
        'mid': '720px'
      }
    },
  },
  plugins: [],
}