import axios from 'axios'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const response = await axios.get(`${config.public.API_URL}/abrigos`, {
    headers: {
      'Authorization': config.public.API_TOKEN
    }
  })

  const data = response.data.map((item: any) => {
    if (!item.longitude || !item.latitude) {
      // Replace missing latitude and longitude with default values
      return {
          ...item,
          latitude: -30,
          longitude: -50
      };
    } else {
      return item;
    }
  });

  return data
})