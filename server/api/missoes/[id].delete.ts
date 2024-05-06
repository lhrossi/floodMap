export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const id = getRouterParam(event, 'id')

  await $fetch(`${config.public.API_URL}/missoes/{id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.public.API_TOKEN
    }
  })

})