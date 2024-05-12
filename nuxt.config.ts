import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    
    API_TOKEN: process.env.NUXT_PUBLIC_API_TOKEN,
    
    public: {
      API_URL: process.env.NUXT_PUBLIC_API_URL
    }
  },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    'nuxt-mapbox',
    '@vueuse/nuxt',
  ],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon-logi.png' }
      ]
    },
  },
  
  mapbox: {
    accessToken: process.env.MAPBOX_ACCESS_TOKEN!
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})