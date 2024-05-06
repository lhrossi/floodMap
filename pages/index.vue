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
              v-for="item in items"
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

                <v-card flat >
                  <v-card-title class="text-body-1">
                    Pontos de Resgate
                  </v-card-title>
                  <v-card-text class="pa-0">
                    <v-list density="compact" nav>
                      <v-list-item>
                        <v-list-item-title>Militar Responsável</v-list-item-title>
                        <v-list-item-subtitle class="no-lineclamping">
                          {{ item.nome_militar_resp }}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-title>Endereço</v-list-item-title>
                        <v-list-item-subtitle class="no-lineclamping">
                          {{ item.endereco }}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-title>Aph</v-list-item-title>
                        <v-list-item-subtitle class="no-lineclamping">
                          {{ item.aph === 1 ? 'Sim' : 'Não' }}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-title>Quantidade Pets</v-list-item-title>
                        <v-list-item-subtitle class="no-lineclamping">
                          {{item.quantidade_pets || 0}}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-title>Meios de Acesso</v-list-item-title>
                        <v-list-item-subtitle class="no-lineclamping">
                           {{ item.transporte }}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-title>Coordenadas</v-list-item-title>
                        <v-list-item-subtitle class="no-lineclamping">
                          Latitude: {{item.latitude}}<br>
                          Longitude: {{item.longitude}}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-title>Civis Resgatados</v-list-item-title>
                        <v-list-item-subtitle class="no-lineclamping">
                          {{ item.quantidade_civis || 0 }}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-title>Risco</v-list-item-title>
                        <v-list-item-subtitle class="no-lineclamping">
                          <v-chip color="green" variant="flat" density="comfortable" v-if="item.situacao === 1">Baixo</v-chip>
                          <v-chip color="orange" variant="flat" density="comfortable" v-if="item.situacao === 2">Médio</v-chip>
                          <v-chip color="red-darken-4" variant="flat" density="comfortable" v-if="item.situacao === 3">Alto</v-chip>
                        </v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-card-text>

                  <!-- <v-divider class="my-0"></v-divider> -->
                  <v-card-actions>
                    <v-btn 
                      color="primary"
                      variant="flat"
                      size="small"
                      block
                      @click="updateSubmit(item)"
                    >
                      Atualizar
                    </v-btn>
                  </v-card-actions>
                </v-card>

              </MapboxDefaultPopup>
            </MapboxDefaultMarker>
            <MapboxGeolocateControl position="bottom-left" />
          </MapboxMap>
        </v-col>
      </v-row>
      
      <v-btn
        @click="handleNew(payloadForm)"
        icon="mdi-plus"
        color="primary"
        location="bottom right"
        size="64"
        absolute
        app
        appear
      ></v-btn>
    </v-container>

    <v-dialog v-model="modal" scrollable :fullscreen="$vuetify.display.smAndDown" :max-width="600">
        
      <v-card>
        <v-card-title>
          Adicionar nova Missão
        </v-card-title>
        <v-divider class="my-0"></v-divider>

        <v-card-text class="pa-0" style="height: 500px">
          <v-container>
            <v-text-field label="Número do Pelotão" v-model="payloadForm.numero_pelotao"></v-text-field>
            <v-text-field label="Nome do Militar Responsável" v-model="payloadForm.nome_militar_resp"></v-text-field>
            <v-select
              label="Risco da situação"
              :items="['1 - BAIXO', '2 - MÉDIO', '3 - ALTO RISCO']"
              v-model="payloadForm.situacao"
            ></v-select>
            <v-text-field label="Endereço" v-model="payloadForm.endereco"></v-text-field>
            <v-text-field label="Lagitude" v-model="payloadForm.latitude" v-bind:model-value="coords.latitude" :disabled="true"></v-text-field>
            <v-text-field label="Longitude" v-model="payloadForm.longitude" v-bind:model-value="coords.longitude" :disabled="true"></v-text-field>
            <v-checkbox label="Atendimento pré Hospitalar" v-model="payloadForm.aph"></v-checkbox>
            <v-text-field label="Civis Resgatados" v-model="payloadForm.quantidade_civis"></v-text-field>
            <v-text-field label="Pets resgatados" v-model="payloadForm.quantidade_pets"></v-text-field>
            <v-select
            multiple
              label="Transporte de acesso"
              :items="['A pé', 'Carro', 'Moto', 'Ambulância', 'Caminhão', 'Helicóptero', 'Barco']"
              v-model="payloadForm.transporte"
            ></v-select>
          
          </v-container>
        </v-card-text>
  
        <v-divider class="my-0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Cancelar"
            @click="modal = false"
          ></v-btn>
          <v-btn
            variant="flat"
            color="primary"
            text="Salvar"
            @click="handleSubmit"
          ></v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
  import { useGeolocation } from '@vueuse/core'
  
  const { coords } = useGeolocation()
  const items = ref([])
  const modal = ref(false)
  const payloadForm = reactive({ })

  useHead({
    titleTemplate: () => "Localização das Tropas",
  });
  
  const { data } = await useFetch('/api/missoes')
  items.value = <Array>data.value

  async function handleNew(data) {
    modal.value = true
    data = reactive({ latitude: coords.latitude, longitude: coords.longitude })
  }

  async function handleSubmit() {
    modal.value = false
    
    const { data: result } = await useFetch<any>('/api/missoes', { method:'post', body: payloadForm });
    modal.value = false
  }
  
  async function updateSubmit() {
    console.log('asdasd')
    // modal.value = true
    // data = dataForUpdate
    // //const { data: result } = await useFetch<any>('/api/missoespost', { method:'post', body: payloadForm });
    // modal.value = false
  }
  
  async function deleteSubmit(id) {
    modal.value = false
    
    console.log(id)
    //const { data: result } = await useFetch<any>('/api/missoespost', { method:'post', body: payloadForm });
    modal.value = false
  }
</script>

<style lang="scss">

  .civis {
    color: #071d41;
    border-radius: 10px; /* Ajuste o valor conforme necessário */
    padding: 5px 10px; /* Ajuste o preenchimento conforme necessário */
    display: inline-block; /* Garante que as bordas arredondadas funcionem corretamente */
  }

  .no-lineclamping {
    -webkit-line-clamp: unset !important;
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
  }

</style>
