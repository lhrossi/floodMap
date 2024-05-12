// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { pt } from 'vuetify/locale'
// import { md1, md2, md3 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import colors from 'vuetify/util/colors'


import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // blueprint: md3,

    locale: {
      locale: 'pt',
      fallback: 'en',
      messages: { pt },
    },

    icons: {
      defaultSet: 'mdi',
      aliases: {
        ...aliases,
        user: 'mdi-account',
      },
      sets: {
        mdi,
      },
    },

    defaults: {
      VMain: { class: "bg-grey-lighten-4" },
      VBtn: { color: 'primary' },
    },

    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: colors.blue.base,
          },
        }
      },
    },
  })
  app.vueApp.use(vuetify)
})
