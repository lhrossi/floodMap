import axios from "axios";
import { Abrigo } from "~/types/abrigo";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const response = await axios.get<Abrigo[]>(
    `${config.public.API_URL}/abrigos`,
    {
      headers: {
        Authorization: config.public.API_TOKEN,
      },
    }
  );

  const data = response.data.filter((item) => item.longitude && item.latitude);

  return data;
});
