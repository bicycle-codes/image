import { defineConfig } from 'vite'
import postcssNesting from 'postcss-nesting'
// import postcssImport from 'postcss-import'

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        postcss: {
            plugins: [
                // postcssImport,
                postcssNesting
            ],
        },
    },
    server: {
        port: 8888,
        host: true,
        open: true,
    }
})
