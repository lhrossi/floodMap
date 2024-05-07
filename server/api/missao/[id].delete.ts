export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const id = getRouterParam(event, 'id')

  const response = await $fetch(`${config.public.API_URL}/missao/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.API_TOKEN
    }
  })

  return response;
})