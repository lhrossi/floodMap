<template>
  <div>
    <Filtros
      v-model="mostrarFiltros"
      :abrigos="abrigos"
      :initialCity="initialCity"
      @closeFilters="() => (mostrarFiltros = false)"
      @filterChange="(a) => (abrigosFiltrados = a)"
    />

    <MapboxMap
      map-id="map"
      :options="{
        style: 'mapbox://styles/mapbox/streets-v12',
        center: mapCenter,
        zoom: mapZoom,
      }"
    >
      <CustomMarker
        v-for="abrigo in abrigosFiltrados"
        :key="abrigo.id"
        :abrigo="abrigo"
        :marker-id="`marker-${abrigo.id}`"
        @on-click="selectedShelter = abrigo; showShelterModal = true"
      />

      <!-- <ShelterModal
        v-if="showShelterModal"
        :shelter="selectedShelter"
        @close="showShelterModal = false; selectedShelter = null"
      /> -->

      <MapboxGeolocateControl position="bottom-right" />
    </MapboxMap>

    <v-chip
      class="fixed top-6 left-4 md:top-8 md:left-6"
      color="white"
      variant="flat"
      @click="() => (mostrarInstrucoes = !mostrarInstrucoes)"
    >
      <div class="flex items-center gap-2">
        <span class="text-base leading-4">Como usar o mapa</span>

        <ion-help-circle-outline class="size-4" />
      </div>
    </v-chip>

    <FloatingBar
      :data="dadosGerais"
      :city="currentCity"
      :cities="cities"
      @show-filters="() => (mostrarFiltros = true)"
      @update-city="filterByCity"
    />

    <v-snackbar v-if="error" multi-line> Falha ao carregar abrigos </v-snackbar>

    <div class="privacy-policy-button">
      <h2 @click="() => (mostrarPrivacyPolicy = true)">Política de privacidade</h2>
    </div>

    <Modal v-if="mostrarInstrucoes" :click="() => closeModal()">
      <Instrucoes />
    </Modal>

    <Modal v-if="mostrarPrivacyPolicy" :click="() => closeModal()">
      <PrivacyPolicy />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import calcularCor from "~/utils/calcularCor";
import { defaultCenter } from "~/config";
import citiesCoordinates from "~/config/citiesCoordinates";

type Props = {
  mapCenter?: number[];
  mapZoom?: number;
  initialCity?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mapCenter: () => defaultCenter,
  mapZoom: 7
});

const token = useRoute().query.token as string;

const requestUrl = token ? `/api/abrigos?token=${new URLSearchParams(token).toString()}` : "/api/abrigos";

const { data: abrigos, error } = await useFetch<any[]>(requestUrl, {});

const abrigosFiltrados = ref(getFilteredSheltersByCity(props.initialCity));
const mostrarFiltros = ref(false);
const mostrarInstrucoes = ref(false);
const mostrarPrivacyPolicy = ref(false);
const currentCity = ref(props.initialCity || 'Todos');

const cities = computed(() => {
  if (!abrigos.value) return [];

  return [{ value: "Todos", label: "Todas as cidades"}].concat(
    abrigos.value
      .map((item) => ({ value: item.city, label: item.city }))
      .filter((city, index, self) => self.findIndex(({ value }) => value === city.value) === index)
      .filter(({ value }) => value && value != "")
      .sort((a, b) => {
        if (b.value === 'Todos') return -1;

        if (a.value < b.value) return -1;

        if (a.value > b.value) return 1;

        return 0;
      })
  );
});

const showShelterModal = ref(false);
const selectedShelter = ref(null);

const dadosGerais = computed(() => {
  const dadosDefault = { totalVagas: 0, totalVagasOcupadas: 0, percentualOcupacao: 0, cor: "#02952B" };

  if (!abrigos.value) return dadosDefault;  

  return abrigosFiltrados.value.reduce((acc, item) => {
    acc.totalVagas += parseInt((item.vagas || 0) ?? "0");
    acc.totalVagasOcupadas += parseInt((item.vagas_ocupadas || 0) ?? "0");
    acc.percentualOcupacao = (acc.totalVagasOcupadas * 100) / acc.totalVagas;
    acc.cor = calcularCor(acc.totalVagas, acc.totalVagasOcupadas);
    return acc;
  }, dadosDefault);
});

function getFilteredSheltersByCity(city?: string) {
  if (!abrigos.value) return [];

  if (!city) return abrigos.value;

  return abrigos.value.filter((abrigo) => city == "Todos" || abrigo.city == city);
}

async function filterByCity(city: string) {
  abrigosFiltrados.value = getFilteredSheltersByCity(city);
  currentCity.value = city;

  await nextTick();
  
  centerMap(city);
}

function getCityCoordinatesAndZoom(city: string) {
  const defaultData = {
    lat: defaultCenter[1],
    lng: defaultCenter[0],
    zoom: 7,
  };

  if (city === "Todos") {
    return defaultData;
  }

  const citySlug = city.replaceAll(/[^A-z]/g, '').toLowerCase();
  const cityData = citiesCoordinates[citySlug];

  if (cityData) {
    return {
      lat: cityData.lat,
      lng: cityData.lng,
      zoom: cityData.initialZoom,
    };
  }

  if (abrigosFiltrados.value?.length) {
    const [first] = abrigosFiltrados.value;
  
    return {
      lat: first.latitude,
      lng: first.longitude,
      zoom: 12,
    };
  }

  return defaultData;
}

function centerMap(city: string) {
  const flyData = getCityCoordinatesAndZoom(city);

  useMapbox("map", (map) => {
    map.flyTo({
      center: [flyData.lng, flyData.lat],
      zoom: flyData.zoom,
      speed: 1,
    });
  });
}

function clearPopups() {
  abrigosFiltrados.value?.forEach((abrigo: any) => {
    abrigo.showPopup = false;
  });
}

function closeModal() {
  mostrarFiltros.value = false;
  mostrarInstrucoes.value = false;
  mostrarPrivacyPolicy.value = false;
};

watch(abrigosFiltrados, clearPopups);
</script>

<style lang="scss">
.mapboxgl-marker {
  cursor: pointer;
}

.mapboxgl-popup-content {
  min-width: 280px;
  border-radius: 5px;
  padding: 14px 16px;
}

.privacy-policy-button {
  cursor: pointer;
  padding: 4px;
  background: rgba(255, 255, 255, 0.5);
  position: fixed;
  bottom: 0;
  border-radius: 8px 8px 0 0;
  right: 50%;
  translate: 50% 0;

  h2 {
    font-size: 14px;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .privacy-policy-button {
    bottom: 50svh;
    right: 0;
    border-radius: 8px;
    translate: 0 50%;
    writing-mode: vertical-lr;
    text-orientation: mixed;
    rotate: 180deg;

    h2 {
      font-size: 14px;
      margin-bottom: -2px;
    }
  }   
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

.filtros {
  padding: 1rem;
  gap: 0.5rem;
}

.mapboxgl-ctrl-group {
  @apply fixed left-3 bottom-32 [&:not(:empty)]:shadow md:bottom-7 md:left-auto md:right-3;

  button.mapboxgl-ctrl-geolocate {
    @apply size-12 rounded-lg;

    .mapboxgl-ctrl-icon {
      @apply size-8 mx-auto;
    }
  }
}
</style>