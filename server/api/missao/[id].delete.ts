export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const id = getRouterParam(event, 'id')
  const cookies = parseCookies(event)

  const response = await $fetch(`${config.public.API_URL}/missao/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies.access_token}`
    }
  })

  return response;
})