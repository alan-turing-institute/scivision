import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), nodePolyfills()],
    base: '/',
    resolve: {
        alias: {
            'node-fetch': 'isomorphic-fetch',
            '@': path.resolve(__dirname, './src'),
        },
    },
    define: {
        // By default, Vite doesn't include shims for NodeJS/
        // necessary for segment analytics lib to work
        global: {},
    },
})
