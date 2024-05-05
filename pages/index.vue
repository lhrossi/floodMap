<template>
  <v-container>
    <v-container>
      <div class="total-vagas flex flex-col">
        <div>
          Total de vagas: <b>{{ totalVagas }}</b>
        </div>
        <div>
          Vagas ocupadas: <b>{{ totalVagasOcupadas }}</b>
        </div>
        <div class="text-lg font-bold text-center" :style="{ color: calcularCor(totalVagas, totalVagasOcupadas) }">
          {{ Math.round((totalVagasOcupadas * 100) / totalVagas) }}%
        </div>
      </div>
      <v-row class="mt-4">
        <v-col>
          <MapboxMap
            map-id="map"
            style="position: absolute; top: 0; bottom: 0; left: 0; width: 100%; height: 100%"
            :options="{
              style: 'mapbox://styles/mapbox/streets-v12',
              center: [-51.1771419, -30.1088701],
              zoom: 9,
            }"
          >
            <LazyMapboxDefaultMarker
              v-for="abrigo of abrigos"
              :marker-id="`marker-${abrigo.id}`"
              :key="abrigo.id"
              :lnglat="[abrigo.longitude, abrigo.latitude]"
              :options="{
                color: calcularCor(abrigo.vagas, abrigo.vagas_ocupadas),
              }"
            >
              <LazyMapboxDefaultPopup
                :popup-id="`popup-${abrigo.id}`"
                :lnglat="[abrigo.longitude, abrigo.latitude]"
                :options="{ closeOnClick: true, closeButton: true }"
              >
                <h3 v-if="abrigo.nome">{{ abrigo.nome }}</h3>
                <p v-if="abrigo.address">{{ abrigo.address }}</p>
                <p v-if="abrigo.nome_contato || abrigo.telefone">
                  {{ abrigo.nome_contato }}
                  <span v-show="abrigo.telefone">- {{ abrigo.telefone }}</span>
                </p>
                <v-divider class="my-2" />
                <ContagemVagas :abrigo="abrigo" />
                <Necessidades :abrigo="abrigo" />
                <v-divider class="my-2" />
                <a
                  class="d-flex justify-end"
                  :href="`https://www.google.com/maps/dir//${abrigo.latitude},${abrigo.longitude}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Como Chegar</a
                >
              </LazyMapboxDefaultPopup>
            </LazyMapboxDefaultMarker>
            <MapboxGeolocateControl position="bottom-right" />
          </MapboxMap>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import calcularCor from "../utils/calcularCor";

const { data: abrigos } = await useFetch<any>("/api/abrigos", {});

console.log(JSON.stringify(abrigos));

const totalVagas = computed(() =>
  abrigos.value.reduce((acc: any, item: any) => {
    const value = parseInt(item.vagas);
    if (isNaN(value)) {
      return acc;
    }
    return acc + value;
  }, 0)
);

const totalVagasOcupadas = computed(() =>
  abrigos.value.reduce((acc: any, item: any) => {
    const value = parseInt(item.vagas_ocupadas);
    if (isNaN(value)) {
      return acc;
    }
    return acc + value;
  }, 0)
);

console.log(JSON.stringify(abrigos.value));

useHead({
  titleTemplate: () => "Localização dos abrigos",
});

useMapbox("map", (map: any) => {
  map._markers.forEach(({ _popup: popup }: any) => {
    popup.remove();
  });
});
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

.total-vagas {
  font-size: 0.75rem;
  position: fixed;
  z-index: 999;
  right: 1rem;
  top: 5rem;
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
}
</style>
