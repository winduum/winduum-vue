module.exports = {
  plugins: [
    require('postcss-import'),
    require('@csstools/postcss-global-data')({
      files: [
        './node_modules/winduum/src/base/breakpoints.css'
      ]
    }),
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('postcss-custom-media'),
    require('tailwindcss'),
    require('autoprefixer')
  ]
}

