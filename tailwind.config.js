import winduum from 'winduum/plugin/tailwind.js'

export default {
    darkMode: 'class',
    content: [
        './src/**/*.vue',
        './node_modules/winduum/src/utilities/ripple/*.js',
        './node_modules/winduum/src/components/dialog/*.js'
    ],
    plugins: [
        winduum()
    ]
}
