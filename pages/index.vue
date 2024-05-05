<template>
  <v-container>
    <v-container>
      <v-row class="mt-4">
        <v-col>
          <MapboxMap
            :map-id="`mapid`"
            style="
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 100%;
            "
            :options="{
              style: 'mapbox://styles/mapbox/streets-v12',
              center: [-51.1771419, -30.1088701],
              zoom: 10,
            }"
          >
            <MapboxDefaultMarker
              v-for="item of items"
              :marker-id="`marker-${item.id}`"
              :key="item.id"
              :lnglat="[item.longitude, item.latitude]"
              :options="{
                color:
                  item.situacao === 1
                    ? 'green'
                    : item.situacao === 2
                    ? 'yellow'
                    : 'red',
              }"
            >
              <MapboxDefaultPopup
                :popup-id="`popup-${item.id}`"
                :lnglat="[item.longitude, item.latitude]"
                :options="{ closeOnClick: false }"
              >
                <h1 class="mb-1 font-bold text-base">
                  {{ item.nome_pelotao }}
                </h1>

                <hr class="my-1 border-t border-gray-100 opacity-10" />
                
                <h3 class="mb-2 font-bold text-sm">
                  Militar Responsável: {{ item.nome_militar_resp }}
                </h3>

                <div class="flex items-center justify-around">
                  <span style="background-color: #4582ff; color: #fff; border-radius: 10px; padding: 5px 10px; display: inline-block;">
                    {{ item.civis }} civis resgatados
                  </span>

                  <span 
                    :class="{
                      'px-2 py-1 rounded-lg inline-block flex items-center bg-green-500 text-white': item.situacao === 1,
                      'px-2 py-1 rounded-lg inline-block flex items-center bg-yellow-500 text-black': item.situacao === 2,
                      'px-2 py-1 rounded-lg inline-block flex items-center bg-red-300 text-white': item.situacao !== 1 && item.situacao !== 2
                    }"
                  >
                    <p class="text-gray-700">
                      {{
                        item.situacao === 1
                          ? "Baixo"
                          : item.situacao === 2
                          ? "Médio"
                          : "Alto"
                      }}
                      Risco
                    </p>
                  </span>

                </div>


                <hr class="my-1 border-t border-gray-100 opacity-10" />

                <p>
                  {{ item.endereco }}
                </p>

                <p v-if="item.situacao_acamados">
                  {{ item.situacao_acamados }}
                </p>

                <p>
                  Aph: {{ item.aph === 1 ? 'Sim' : 'Não' }}
                </p>

                <P>
                  Quantidade Pets: {{item.quantidade_pets}}
                </P>

                <p>
                  Meios de acesso:
                  <span v-for="(transporte, index) in item.transporte" :key="index">
                    {{ transporte }}{{ index !== item.transporte.length - 1 ? ', ' : '' }}
                  </span>
                </p>

                <hr class="my-1 border-t border-gray-100 opacity-10" />

                <h3 class="mb-2 font-bold text-sm">
                  Coordenadas:
                </h3>

                <p>
                  Lat: {{item.latitude}}
                </p>

                <p>
                  Long: {{item.longitude}}
                </p>

              </MapboxDefaultPopup>
            </MapboxDefaultMarker>
            <MapboxGeolocateControl position="bottom-right" />
          </MapboxMap>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: () => "Localização das Tropas",
});

const items = ref([
  {
    longitude: -51.150350635190655,
    latitude: -30.049900789428545,
    id: "1SazynPW6hAHbiyS57cs",
    nome_militar_resp: "Alan Cardec",
    civis:"05",
    situacao: 2, // 1 - baixo, 2 - médio, 3 - alto risco
    coordenadas: "-30.049900789428545, -51.150350635190655",
    endereco: "Avenida Alcides São Severiano, 100 bairro sarandi",
    situacao_acamados: "Precisa de Transporte de acamados",
    aph: false,
    quantidade_pets: 0,
    transporte: ["Ônibus", "A pé", "Carro", "Moto"],
    ext: "",
    nome_militar_resp: "Teste da silva",
  },
]);
</script>

<style lang="scss">
  .civis {
    color: #071d41;
    border-radius: 10px; /* Ajuste o valor conforme necessário */
    padding: 5px 10px; /* Ajuste o preenchimento conforme necessário */
    display: inline-block; /* Garante que as bordas arredondadas funcionem corretamente */
  }

</style>
