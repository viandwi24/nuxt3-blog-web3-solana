// https://nuxt.com/docs/api/configuration/nuxt-config
const APP_TITLE = 'Blog Web3 With Nuxt & Solana'
const APP_DESC = 'a decentral blog made using nuxt and solana with web3 concept'

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: APP_TITLE,
      titleTemplate: `%s - ${APP_TITLE}`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no' },
        { hid: 'description', name: 'description', content: APP_DESC },
        { hid: 'og:title', property: 'og:title', content: APP_TITLE },
        { hid: 'og:description', property: 'og:description', content: APP_DESC },
      ]
    }
  },
  css: [
    '~/assets/scss/main.scss',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt'
  ],
  vite: {
    esbuild: {
      target: "esnext",
    },
    build: {
      target: "esnext",
    },
    optimizeDeps: {
      include: ["@project-serum/anchor", "@solana/web3.js", "buffer", "@solana/wallet-adapter-base"],
      esbuildOptions: {
        target: "esnext",
      },
    },
    define: {
      "process.env.BROWSER": true,
    },
  },
})
