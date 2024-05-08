import { navigateTo } from "nuxt/app"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const id = getRouterParam(event, 'id')
  const cookies = parseCookies(event)

  const missao = await $fetch(`${config.public.API_URL}/missao/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: config.API_TOKEN
      Authorization: cookies.access_token
    }
  });

  return missao;
})