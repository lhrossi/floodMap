import axios from "axios";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig();
  console.log(config.MAPBOX_ACCESS_TOKEN)
  console.log(query)
  const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query.city + ", Rio Grande do Sul, Brasil")}.json?access_token=${config.MAPBOX_ACCESS_TOKEN}`;

  try {
    const response = await axios.get(geocodingUrl);
    const features = response.data.features;
    if (features.length > 0) {
      console.log(features[0].geometry)
      const { coordinates } = features[0].geometry;
      return coordinates; // Retorna as coordenadas no formato [longitude, latitude]
    } else {
      throw new Error('Cidade não encontrada.');
    }
  } catch (error) {
    
    console.error('Erro ao obter coordenadas:', error);
    return null;
  }
});
