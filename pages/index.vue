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
                
              <h3>{{ item.nome_pelotao }} - {{item.civis}} civis - </h3>
              {{ item.situacao === 1 ? 'Baixo' : item.situacao === 2 ? 'Médio' : 'Alto' }} Risco
                <p>{{ item.coordenadas }} <br> {{ item.endereco }}</p><br>
                <p v-if="item.situacao_acamados">{{ item.situacao_acamados }}</p>
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
  titleTemplate: () => 'Localização das Tropas'
})

const items = ref([
  {
    longitude: -51.150350635190655,
    latitude: -30.049900789428545,
    id: "1SazynPW6hAHbiyS57cs",
    nome_pelotao: "Esquadrão especial",
    civis:"05",
    situacao: 2, // 1 - baixo, 2 - médio, 3 - alto risco
    coordenadas: "-30.049900789428545, -51.150350635190655",
    endereco: "Avenida Alcides São Severiano, 100 bairro sarandi",
    situacao_acamados:"Precisa de Transporte de acamados",
    aph: false,
    ext: ""
    
  }
])
</script>

<style lang="scss">
</style>