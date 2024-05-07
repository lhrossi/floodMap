import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const response = await axios.post(`${config.public.API_URL}/missoes`, body, {
    headers: {
      'Authorization': config.API_TOKEN,
    }
  })
  return response.data;
})