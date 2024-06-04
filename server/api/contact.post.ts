import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  try {
    const response = await axios.post(`${config.API_URL}/send-email`, body);
    return response;
  }
  catch (err) {
    return err;
  }
});
