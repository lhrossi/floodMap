export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const id = getRouterParam(event, 'id')

  const missao = await $fetch(`${config.public.API_URL}/missao/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.public.API_TOKEN
    }
  });

  return missao;
})