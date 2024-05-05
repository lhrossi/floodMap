<template>
  <v-container>
    <v-container>
      <v-row class="mt-4">
        <v-col>
          <MapboxMap
            :map-id="`mapid`"
            style="position: absolute; top: 0; bottom: 0; left: 0; width: 100%; height: 100%"
            :options="{
              style: 'mapbox://styles/mapbox/streets-v12',
              center: [-51.1771419, -30.1088701],
              zoom: 10
            }"
          >
            <MapboxDefaultMarker
              v-for="item of items"
              :marker-id="`marker-${item.id}`"
              :key="item.id"
              :lnglat="[item.longitude, item.latitude]"
              :options="{ 
                color: item.situacao === 1 ? 'green' : item.situacao === 2 ? 'yellow' : 'red',
              }"
            >
              <MapboxDefaultPopup
                :popup-id="`popup-${item.id}`"
                :lnglat="[item.longitude, item.latitude]"
                :options="{
                  closeOnClick: false
                }"
              >
              <!-- faça um output de texto do status de gravidade baseado na variável item.situacao, verificando se o valor da variável for igual a 1 (baixo), 2 (médio) e 3 (alto)-->
                
              <h3>{{ item.nome_militar_resp }} - {{item.civis}} civis - </h3>
              {{ item.situacao === 1 ? 'Baixo' : item.situacao === 2 ? 'Médio' : 'Alto' }} Risco
                <p>{{ item.coordenadas }} <br> {{ item.endereco }}</p><br>
                <p v-if="item.situacao_acamados">{{ item.situacao_acamados }}</p>
                <p> Transporte:  {{ item.transporte }} </p>
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
import { useGeolocation } from '@vueuse/core'
const { coords } = useGeolocation()

useHead({
  titleTemplate: () => 'Localização das Tropas'
})

const { data: items } =  await useFetch<any>('/api/missoes');

// const { data: result } =  await useFetch<any>('/api/missoes', { method:'post',
//   body:{
//       longitude: -71.150350635190655, 
//       latitude: -30.049900789428545,
//       nome_militar_resp: "Leandro Cardec", 
//       civis:"05",
//       situacao: 2, // 1 - baixo, 2 - médio, 3 - alto risco
//       coordenadas: "-30.049900789428545, -51.150350635190655",
//       endereco: "Avenida Bage - Canoas",
//       situacao_acamados:"Precisa de Transporte de acamados",
//       aph: false,
//       transporte: "carro" // carro, moto, ambulância, caminhão, helicóptero, barco
//     }});
// console.log(result)  
</script> 

<style lang="scss">
</style>