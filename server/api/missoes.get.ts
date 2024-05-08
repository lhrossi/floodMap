export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const cookies = parseCookies(event)

    const items = await $fetch(`${config.public.API_URL}/missoes`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookies.access_token
      }
    })
  
    return items;

  })