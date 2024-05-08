export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)

  const { user } = await $fetch(`${config.public.API_URL}/signIn`, {
    method: 'post',
    body,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: config.API_TOKEN
    }
  })

  return user;
});


