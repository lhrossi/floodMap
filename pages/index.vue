<template>
  <v-container>
    <v-container>
      <v-row class="mt-4">
        <v-col>
          <MapboxMap
            map-id="map"
            style="position: absolute; top: 0; bottom: 0; left: 0; width: 100%;height: 100%"
            :options="{
              style: 'mapbox://styles/mapbox/streets-v12',
              center: [-51.1771419, -30.1088701],
              zoom: 9
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
                :options="{ closeOnClick: true, closeButton: true }"
              >
                <h3 v-if="item.nome">{{ item.nome }}</h3>
                <p v-if="item.address">{{ item.address }}</p>
                <p v-if="item.nome_contato || item.telefone">{{ item.nome_contato }} <span v-show="item.telefone">- {{ item.telefone }}</span></p>
                <p v-if="item.demanda">{{ item.demanda }}</p>
                <v-divider class="my-2"/>
                <v-chip v-if="item.vagas" size="small" color="primary">{{ item.vagas }} vagas</v-chip>
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
import axios from 'axios'
useHead({
  titleTemplate: () => 'Localização dos abrigos'
})

const config = useRuntimeConfig()
const { data: items } = useQuery<any>({
  queryKey: ['abrigos'],
  queryFn: () => axios.get(`${config.public.API_URL}/abrigos`, {
    headers: {
      'Authorization': config.public.API_TOKEN
    }
  }),
  select: (response) => response.data.filter((item: any) => item.longitude && item.latitude),
})

watch(items, (newItems: any) => {
  if (newItems.length) {
    newItems.forEach((item: any) => {
      useMapboxPopup(`popup-${item.id}`, (popup) => {
        popup.remove()
      })
    })
  }
})

</script>

<style lang="scss">
.mapboxgl-popup-content {
  min-width: 250px;
}
.mapboxgl-popup-close-button {
  width: 25px;
  height: 25px;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;

  &:focus {
    outline: none;
  }
}
</style>