export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)

  const item = await $fetch(`${config.public.API_URL}/missoes/`, {
    method: 'post',
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.public.API_TOKEN
    }
  })

  return item;
});


