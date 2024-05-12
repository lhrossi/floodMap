import axios from "axios";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    let token = config.API_TOKEN as string;
    if (event.path.includes("token"))
      token = event.path.split("token=").pop()!.split("&")[0];

    const response = await axios.get(`${config.API_URL}/abrigos`, {
      headers: {
        Authorization: token,
      },
    });

    const data = response.data.map((item: any) => {
      if (!item.longitude || !item.latitude) {
        // Replace missing latitude and longitude with default values
        return {
          ...item,
          latitude: -30,
          longitude: -50,
        };
      } else {
        return item;
      }
    });

    return data;
  } catch (err) {
    console.error("err", err);
    return [];
  }
});
