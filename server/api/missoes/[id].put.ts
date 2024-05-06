export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const id = getRouterParam(event, 'id')

  const item = await $fetch(`${config.public.API_URL}/missoes/{id}`, {
    method: 'put',
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.public.API_TOKEN
    }
  })

  return item;
});


