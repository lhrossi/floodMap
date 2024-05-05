import axios from 'axios';
import { createRouter, defineEventHandler, useBase } from 'h3';
const router = createRouter();
const config = useRuntimeConfig()

router.get(
  '/get',
  defineEventHandler(async (event) => {
    const response = await axios.get(`${config.public.API_URL}/missoes`, {
      headers: {
        'Authorization': config.public.API_TOKEN
      }
    })
  
    return response.data
  })
);

router.post(
  '/missoes',
  defineEventHandler(async (event) => {
    const response = await axios.post(`${config.public.API_URL}/missoes`, {
      headers: {
        'Authorization': config.public.API_TOKEN
      }
    })
  
    return response.data
  })
);

router.put(
  '/missoes',
  defineEventHandler(async (event) => {
    const response = await axios.post(`${config.public.API_URL}/missoes`, {
      headers: {
        'Authorization': config.public.API_TOKEN
      }
    })
  
    return response.data
  })
);

router.delete(
  '/missoes',
  defineEventHandler(async (event) => {
    const response = await axios.delete(`${config.public.API_URL}/missoes`, {
      headers: {
        'Authorization': config.public.API_TOKEN
      }
    })
  
    return response.data
  })
);

export default useBase('/api/missoes/', router.handler);