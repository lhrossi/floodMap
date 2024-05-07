export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    const items: Array<T> = await $fetch(`${config.public.API_URL}/missoes`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.API_TOKEN
      }
    })
  
    return items;

  })