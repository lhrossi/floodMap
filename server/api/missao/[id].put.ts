export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const id = getRouterParam(event, 'id')
  const cookies = parseCookies(event)
  
  const item = await $fetch(`${config.public.API_URL}/missao/${id}`, {
    method: 'put',
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies.access_token}`
    }
  })

  return item;
});


