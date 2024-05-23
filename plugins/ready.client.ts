export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    delete window.__NUXT__;
  })
})