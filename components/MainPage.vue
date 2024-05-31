<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { defaultCenter } from '~/config';
import citiesCoordinates from '~/config/citiesCoordinates';
import type { Abrigo } from '~/models/Abrigo';

type Props = {
  mapCenter?: number[];
  mapZoom?: number;
  initialCity?: string;
};

const props = withDefaults(defineProps<Props>(), {
  mapCenter: () => defaultCenter,
  mapZoom: 7,
});

const selectedMenuItem = inject<any>('selectedMenuItem');
const resetMenuItem = inject<any>('resetMenuItem');

watch(selectedMenuItem, (value: string) => {
  switch (value) {
    case 'how_to_use':
      mostrarInstrucoes.value = true;
      if (resetMenuItem) resetMenuItem();
      break;

    case 'privacy_policy':
      mostrarPrivacyPolicy.value = true;
      if (resetMenuItem) resetMenuItem();
      break;

    case 'login':
      window.open('https://abrigospoa.web.app/login');
      break;

    default:
      break;
  }
});

const token = useRoute().query.token as string;

const requestUrl = token ? `/api/abrigos?token=${new URLSearchParams(token).toString()}` : '/api/abrigos';

const { data: abrigos, error } = await useFetch<any[]>(requestUrl, {});

const abrigosFiltrados = ref(getFilteredSheltersByCity(props.initialCity));
const mostrarFiltros = ref(false);
const mostrarInstrucoes = ref(false);
const mostrarPrivacyPolicy = ref(false);
const currentCity = ref(props.initialCity || 'Todos');
const isMapShown = ref(true);

const cities = computed(() => {
  if (!abrigos.value) return [];

  return [
    {
      value: 'Todos',
      label: 'Todas as cidades',
    },
  ].concat(
    abrigos.value
      .map((item) => ({
        value: item.city,
        label: item.city,
      }))
      .filter((city, index, self) => self.findIndex(({ value }) => value === city.value) === index)
      .filter(({ value }) => value && value !== '')
      .sort((a, b) => {
        if (b.value === 'Todos') return -1;

        if (a.value < b.value) return -1;

        if (a.value > b.value) return 1;

        return 0;
      }),
  );
});

const selectedShelter = ref<Abrigo | null>(null);

function handleMarkerClick(shelter: Abrigo | null) {
  selectedShelter.value = shelter;
}

function handleSwitchMap() {
  isMapShown.value = !isMapShown.value;

  if (isMapShown.value)
    centerMap(currentCity.value);
}

function handleCloseShelterModal() {
  selectedShelter.value = null;
}

const dadosGerais = computed(() => {
  const dadosDefault = {
    totalVagas: 0,
    totalVagasOcupadas: 0,
    percentualOcupacao: 0,
  };

  if (!abrigos.value) return dadosDefault;

  return abrigosFiltrados.value.reduce((acc, item) => {
    acc.totalVagas += Number.parseInt((item.vagas || 0) ?? '0') || 0;
    acc.totalVagasOcupadas += Number.parseInt((item.vagas_ocupadas || 0) ?? '0') || 0;

    acc.percentualOcupacao = acc.totalVagas === 0 ? 100 : (acc.totalVagasOcupadas * 100) / acc.totalVagas;

    return acc;
  }, dadosDefault);
});

function getFilteredSheltersByCity(city?: string) {
  if (!abrigos.value) return [];

  if (!city) return abrigos.value;

  return abrigos.value.filter((abrigo) => city === 'Todos' || abrigo.city === city);
}

async function filterByCity(city: string) {
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

  if (city === 'Todos')
    return defaultData;

  const citySlug = city.replaceAll(/[^A-Z]/gi, '').toLowerCase();
  const cityData = citiesCoordinates[citySlug];

  if (cityData) {
    return {
      lat: cityData.lat,
      lng: cityData.lng,
      zoom: cityData.initialZoom,
    };
  }

  if (abrigosFiltrados.value?.length) {
    const [
      first,
    ] = abrigosFiltrados.value;

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

  useMapbox('map', (map) => {
    map.flyTo({
      center: [
        flyData.lng,
        flyData.lat,
      ],
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

<template>
  <div class="bg-[#F1F1F1]">
    <Filtros
      v-model="mostrarFiltros"
      :abrigos="abrigos || []"
      :current-city="currentCity"
      @close-filters="() => (mostrarFiltros = false)"
      @filter-change="(a) => (abrigosFiltrados = a)"
    />

    <MapboxMap
      v-if="isMapShown"
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
        @on-click="() => handleMarkerClick(abrigo)"
      />

      <ShelterModal
        v-if="!!selectedShelter"
        :abrigo="selectedShelter"
        @on-close="handleCloseShelterModal"
      />

      <MapboxGeolocateControl position="bottom-right" />
    </MapboxMap>

    <ShelterList
      v-else
      :abrigos="abrigosFiltrados"
      :selected-city="currentCity"
      @on-switch-map="handleSwitchMap"
    />

    <FloatingBar
      :data="dadosGerais"
      :city="currentCity"
      :cities="cities"
      :is-map-shown="isMapShown"
      @show-filters="() => (mostrarFiltros = true)"
      @update-city="filterByCity"
      @on-switch-map="handleSwitchMap"
    />

    <v-snackbar
      v-if="error"
      multi-line
    >
      Falha ao carregar abrigos
    </v-snackbar>

    <button
      v-if="isMapShown"
      class="shelter-list__button"
      @click="handleSwitchMap"
    >
      <Icon
        icon="ion:list"
        height="16px"
        color="#fff"
      />

      <p>Ver lista de abrigos</p>
    </button>

    <v-snackbar
      v-if="error"
      multi-line
    >
      Falha ao carregar abrigos
    </v-snackbar>

    <div class="privacy-policy-button">
      <h2 @click="() => (mostrarPrivacyPolicy = true)">
        Política de privacidade
      </h2>
    </div>

    <Modal
      :open="mostrarInstrucoes"
      @close="closeModal"
    >
      <Instrucoes />
    </Modal>

    <Modal
      :open="mostrarPrivacyPolicy"
      @close="closeModal"
    >
      <PrivacyPolicy />
    </Modal>
  </div>
</template>

<style lang="scss">
.mapboxgl-marker {
  cursor: pointer;
}

.mapboxgl-popup-content {
  min-width: 280px;
  border-radius: 5px;
  padding: 14px 16px;
}

.shelter-list__button {
  @apply
    mobile:flex
    laptop:hidden
    fixed
    items-center
    top-[88px]
    left-[50%]
    translate-x-[-50%]
    bg-[#475DFF]
    z-[500]
    h-[40px]
    w-fit
    px-5
    shadow-xl
    rounded-3xl
    min-w-max;

    p {
      @apply
        ml-2
        text-white
    }
}

.privacy-policy-button {
  cursor: pointer;
  padding: 4px 24px;
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  bottom: 0;
  border-radius: 8px 8px 0 0;
  right: 50%;
  translate: 50% 0;

  h2 {
    font-size: 14px;
    font-weight: 400;
  }
}
@media (max-width: 768px) {
  .privacy-policy-button {
    display: none;
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
