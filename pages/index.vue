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
                  {{ item.numero_pelotao }}
                </h1>

                <hr class="my-1 border-t border-gray-100 opacity-10" />
                
                <h3 class="mb-2 font-bold text-sm">
                  Militar Responsável: {{ item.nome_militar_resp }}
                </h3>

                <div class="flex items-center justify-around">
                  <span style="background-color: #4582ff; color: #fff; border-radius: 10px; padding: 5px 10px; display: inline-block;">
                    {{ item.quantidade_civis }} civis resgatados
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
                  Meios de acesso: {{ transporte }}
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
            <MapboxGeolocateControl position="bottom-left" />
          </MapboxMap>
        </v-col>
      </v-row>
      
      <v-fab
        @click="modal = true"
        icon="mdi-plus"
        color="blue"
        class="ms-4 mb-4"
        location="bottom right"
        size="64"
        absolute
        app
        appear
      ></v-fab>
    </v-container>

    <v-dialog v-model="modal" max-width="600">
        <template v-slot:default="{ isActive }">
          <v-card title="Adicionar nova Missão">
            <v-container>
              <v-text-field label="Número do Pelotão" v-model="payloadForm.numero_pelotao"></v-text-field>
              <v-text-field label="Nome do Militar Responsável" v-model="payloadForm.nome_militar_resp"></v-text-field>
              <v-select
                label="Risco da situação"
                :items="['1 - baixo', '2 - médio', '3 - alto risco']"
                v-model="payloadForm.situacao"
              ></v-select>
              <v-text-field label="Endereço" v-model="payloadForm.endereco"></v-text-field>
              <v-checkbox label="Atendimento pré Hospitalar" v-model="payloadForm.aph"></v-checkbox>
              <v-text-field label="Civis Resgatados" v-model="payloadForm.quantidade_civis"></v-text-field>
              <v-text-field label="Pets resgatados" v-model="payloadForm.quantidade_pets"></v-text-field>
              <v-select
                label="Transporte de acesso"
                :items="['A pé', 'Carro', 'Moto', 'Ambulância', 'Caminhão', 'Helicóptero', 'Barco']"
                v-model="payloadForm.transporte"
              ></v-select>
            
            </v-container>
      
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text="Salvar"
                @click="handleSubmit"
              ></v-btn>
              <v-btn
                text="Cancelar"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
  import { useGeolocation } from '@vueuse/core'
  const { coords } = useGeolocation()

  useHead({
    titleTemplate: () => "Localização das Tropas",
  });
  
  const { data: items } =  await useFetch<any>('/api/missoes');

  const modal = ref(false)

  const payloadForm = reactive({})

  async function handleSubmit() {
    modal.value = false
    console.log(payloadForm)
    
    const { data: result } = await useFetch<any>('/api/missoes', { method:'post', body: payloadForm });
    modal.value = false
    console.log(result)  
  }


</script>

<style lang="scss">

  .civis {
    color: #071d41;
    border-radius: 10px; /* Ajuste o valor conforme necessário */
    padding: 5px 10px; /* Ajuste o preenchimento conforme necessário */
    display: inline-block; /* Garante que as bordas arredondadas funcionem corretamente */
  }

</style>
