export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
  
    // const items: Array<T> = await $fetch(`${config.public.API_URL}/missoes`, {
    //   method: 'get',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: config.public.API_TOKEN
    //   }
    // })
  
    // return items;

    return [
      {
        longitude: -51.150350635190655,
        latitude: -30.049900789428545,
        id: "1SazynPW6hAHbiyS57cs",
        nome_militar_resp: "Alan Cardec",
        civis:"05",
        situacao: 2,
        coordenadas: "-30.049900789428545, -51.150350635190655",
        endereco: "Avenida Alcides São Severiano, 100 bairro sarandi",
        situacao_acamados:"Precisa de Transporte de acamados",
        aph: false,
        transporte: ["Carro"]
      }
    ]
  })