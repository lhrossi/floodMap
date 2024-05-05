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
        <div
          class="text-lg font-bold text-center"
          :style="{ color: calcularCor(totalVagas, totalVagasOcupadas) }"
        >
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
            {{ filter.name }}: {{ items?.filter(filter.filterFunction).length }}
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
              v-for="item of filteredItems"
              :marker-id="`marker-${item.id}`"
              :key="item.id"
              :lnglat="[item.longitude, item.latitude]"
              :options="{
                color: calcularCor(item.vagas, item.vagas_ocupadas),
              }"
            >
              <LazyMapboxDefaultPopup
                :popup-id="`popup-${item.id}`"
                :lnglat="[item.longitude, item.latitude]"
                :options="{ closeOnClick: true, closeButton: true }"
              >
                <h3 v-if="item.nome">{{ item.nome }}</h3>
                <p v-if="item.address">{{ item.address }}</p>
                <p v-if="item.nome_contato || item.telefone">
                  {{ item.nome_contato }}
                  <span v-show="item.telefone">- {{ item.telefone }}</span>
                </p>
                <v-divider class="my-2" />
                <div class="flex space-x-2">
                  <v-chip v-if="item.vagas" variant="flat" size="small" color="primary">{{ item.vagas }} vagas</v-chip>
                  <v-chip
                    v-if="
                      !isNaN(item.vagas) &&
                      !isNaN(item.vagas_ocupadas) &&
                      item.vagas > 0
                    "
                    variant="flat"
                    size="small"
                    :color="calcularCor(item.vagas, item.vagas_ocupadas)"
                    >{{
                      Math.max(item.vagas - item.vagas_ocupadas, 0)
                    }}
                    livres</v-chip
                  >
                </div>
                <Necessidades :abrigo="item" />
                <v-divider class="my-2" />
                <a
                  class="d-flex justify-end"
                  :href="`https://www.google.com/maps/dir//${item.latitude},${item.longitude}`"
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
const { data: items, error } = await useFetch<any>('/api/abrigos',
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
  if (!items.value) {
    return []
  }
  const enabledFilters = filters.value.filter(f => f.enabled)
  if (enabledFilters.length === 0) {
    return items.value
  }
  return items.value.filter(item => enabledFilters.every(filter => filter.filterFunction(item)))
})

const totalVagas = computed(() => {
  if (!items.value) {
    return 0
  }
  return items.value.reduce((acc, item) => {
    const value = parseInt(item.vagas)
    if (isNaN(value)) {
      return acc
    }
    return acc + value
  }, 0)
})

const totalVagasOcupadas = computed(() => {
  if (!items.value) {
    return 0
  }
  return items.value.reduce((acc, item) => {
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

function calcularCor(vagas:any, vagasOcupadas:any) {
  if (isNaN(vagas) || isNaN(vagasOcupadas) || vagas <= 0) {
    return "lightgrey";
  }
  const percentual = (vagasOcupadas * 100) / vagas;
  if (percentual <= 50) {
    // Calcula a cor entre verde e amarelo
    var r = Math.floor(255 * (percentual / 50));
    var g = 255;
    var b = 0;
  } else {
    // Calcula a cor entre amarelo e vermelho
    var r = 255;
    var g = Math.floor(255 * ((100 - percentual) / 50));
    var b = 0;
  }
  return `rgb(${r}, ${g}, ${b})`;
}
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
<<<<<<< HEAD

.filtros {
  padding: 1rem;
  gap: 0.5rem;
}

</style>
=======
</style>
>>>>>>> f31ade596a4d46986b2785e656148d312ea1faf4
