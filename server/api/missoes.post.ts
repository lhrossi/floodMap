export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const cookies = parseCookies(event)

  const item = await $fetch(`${config.public.API_URL}/missao/`, {
    method: 'post',
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: cookies.access_token
    }
  })

  // return {
  //   id: "PGL6NljrRPsaKFgQKlXS",
  //   message: "Missão criada com sucesso",
  // }
  return item;
});


