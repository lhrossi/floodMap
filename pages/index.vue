<template>
  <v-container>
    <v-container>
      <v-snackbar v-model="error" multi-line >
        Falha ao carregar abrigos
      </v-snackbar>
      <div class="total-vagas">
        <div>
          Total de vagas: <b>{{ totalVagas }}</b>
        </div>
        <div>
          Vagas ocupadas: <b>{{ totalVagasOcupadas }}</b>
        </div>
        <div class="text-lg font-bold text-center" :style="{ color: calcularCor(totalVagas, totalVagasOcupadas) }">
          {{ Math.round((totalVagasOcupadas * 100) / totalVagas) }}%
        </div>
        <v-btn size="small" v-on:click="filterDrawer = true">
          Filtrar abrigos
        </v-btn>
      </div>
      <v-navigation-drawer
        v-model="filterDrawer"
        temporary
      >
        <div class="flex flex-column filtros">
          <span>Filtrar abrigos</span>
          <v-chip
            v-for="filter of filters"
            v-on:click="filter.enabled = !filter.enabled"
            :variant="filter.enabled ? 'elevated' : 'outlined'"
            size="small" color="primary">
            {{ filter.name }}: {{ abrigos?.filter(filter.filterFunction).length }}
          </v-chip>
          <v-btn size="small" v-on:click="filterDrawer = false">
            Fechar
          </v-btn>
        </div>
      </v-navigation-drawer>
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
              v-for="abrigo of filteredItems"
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

const { data: abrigos, error } = await useFetch<any>('/api/abrigos',
  { }
)

const filterDrawer = ref(false)

let filters = ref([
  { name: 'Com vagas', enabled: false, filterFunction: item => parseInt(item.vagas_ocupadas) < parseInt(item.vagas) },
  { name: 'Com Cozinha', enabled: false, filterFunction: item => item.cozinha == true },
  { name: 'Com Banheiros', enabled: false, filterFunction: item => item.banheiros == true },
  { name: 'Com Demanda', enabled: false, filterFunction: item => item.demanda != null },
])

const filteredItems = computed(() => {
  if (!abrigos.value) {
    return []
  }
  const enabledFilters = filters.value.filter(f => f.enabled)
  if (enabledFilters.length === 0) {
    return abrigos.value
  }
  return abrigos.value.filter(item => enabledFilters.every(filter => filter.filterFunction(item)))
})

const totalVagas = computed(() => {
  if (!abrigos.value) {
    return 0
  }
  return abrigos.value.reduce((acc, item) => {
    const value = parseInt(item.vagas)
    if (isNaN(value)) {
      return acc
    }
    return acc + value
  }, 0)
})

const totalVagasOcupadas = computed(() => {
  if (!abrigos.value) {
    return 0
  }
  return abrigos.value.reduce((acc, item) => {
    const value = parseInt(item.vagas_ocupadas)
    if (isNaN(value)) {
      return acc
    }
    return acc + value
  }, 0)
})

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

.filtros {
  padding: 1rem;
  gap: 0.5rem;
}

</style>
