import axios from 'axios'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const response = await axios.get(`${config.public.API_URL}/abrigos`, {
    headers: {
      'Authorization': config.public.API_TOKEN
    }
  })

  const data = response.data.filter((item: any) => item.longitude && item.latitude)

  return data
})