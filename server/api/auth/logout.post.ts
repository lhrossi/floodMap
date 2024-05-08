export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)

  const { data: user } = await $fetch(`${config.public.API_URL}/signOut`, {
    method: 'post',
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.API_TOKEN
    }
  })

  return user;
});


