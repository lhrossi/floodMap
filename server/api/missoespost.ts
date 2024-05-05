import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const response = await axios.post(`http://localhost:3000/missoes`, {
    body: await readBody(event),
    headers: {
      'Authorization': config.public.API_TOKEN,
    }
  })
  return response.data;
})