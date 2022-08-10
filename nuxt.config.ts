import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    server: {
        port: 3999
    },
    vite: {
        server: {
            port: 3999
        },
        esbuild: {
            pure: ["console.log"],
            minify: true
        }
    }
})
