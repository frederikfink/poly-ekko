module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'body': ['Space Grotesk', 'space-grotesk', 'sans-serif'],
      'display': ['Space Grotesk', 'space-grotesk', 'sans-serif'],
      'sans': ['Space Grotesk', 'space-grotesk', 'sans-serif'],
      'mono': ['Space Mono', 'space-mono', 'monospace'],
      'serif': ['Space Grotesk', 'space-grotesk', 'sans-serif']
    },
    extend: {
      width: {
        '820': '820px',
       }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
