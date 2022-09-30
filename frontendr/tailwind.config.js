module.exports = {
  content: [
    "src/pages/**/*.{ts,tsx,html}",
    "src/components/**/*.{ts,tsx,html}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/img/bkn-image.jpg')",
      }
    },
  },
  plugins: [],
}
