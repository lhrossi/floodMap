export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const id = getRouterParam(event, 'id')

  const item = await $fetch(`${config.public.API_URL}/missao/${id}`, {
    method: 'put',
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.API_TOKEN
    }
  })

  return item;
});


