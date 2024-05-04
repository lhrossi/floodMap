<template>
  <v-container>
    <v-container>
      <v-row class="mt-4">
        <v-col>
          <MapboxMap
            :map-id="`mapid`"
            style="position: absolute; top: 0; bottom: 0; left: 0; width: 100%;height: 100%"
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
              :options="{}"
            >
              <MapboxDefaultPopup
                :popup-id="`popup-${item.id}`"
                :lnglat="[item.longitude, item.latitude]"
                :options="{
                  closeOnClick: false
                }"
              >
                <h3>{{ item.nome || '-' }}</h3>
                <p>{{ item.nome_contato }} - {{ item.telefone }}</p>
                <p v-if="item.demanda">{{ item.demanda }}</p>
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
  titleTemplate: () => 'Localização dos abrigos'
})

const items = ref([
  {
    longitude: -51.150350635190655,
    latitude: -30.049900789428545,
    address: "Avenida Alcides São Severiano, 100 bairro sarandi",
    banheiros: null,
    cozinha: null,
    create_in: "4 de maio de 2024 às 16:58:40 UTC-3",
    demanda: null,
    estrutura_pessoas: null,
    ext_getLatLongStatus: {
      "error": "{}",
      "status": "ERROR"
    },
    id: "1SazynPW6hAHbiyS57cs",
    nome: "colégio Luterana da Paz",
    nome_contato: "Mariana Vargas",
    pmpa: "PUFF",
    roupa_cama: null,
    telefone: "(51) 98150-7813",
    update_in: "4 de maio de 2024 às 1"
    
  }
])
</script>

<style lang="scss">
</style>