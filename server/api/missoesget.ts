import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const response = await axios.get(`${config.public.API_URL}/missoes`, {
    headers: {
      'Authorization': config.API_TOKEN
    }
  })

  const data = response.data.filter((item: any) => item.longitude && item.latitude)

  return data
})