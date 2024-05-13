<template>
  <div>
    <Filtros
      v-model="mostrarFiltros"
      :abrigos="abrigos"
      :initialCity="initialCity"
      @closeFilters="() => (mostrarFiltros = false)"
      @filterChange="(a) => (abrigosFiltrados = a)"
      @cityChange="centerMap"
    />

    <MapboxMap
      map-id="map"
      :options="{
        style: 'mapbox://styles/mapbox/streets-v12',
        center: mapCenter,
        zoom: mapZoom,
      }"
    >
      <Marker
        v-for="abrigo in abrigosFiltrados"
        :key="abrigo.id"
        :abrigo="abrigo"
      />

      <MapboxGeolocateControl position="bottom-right" />
    </MapboxMap>

    <v-snackbar v-model="error" multi-line> Falha ao carregar abrigos </v-snackbar>

    <FloatingBar
      :data="dadosGerais"
      :city="currentCity"
      :cities="cities"
      @show-filters="() => (mostrarFiltros = true)"
      @update-city="filterByCity"
    />

    <div class="instructions text-center w-full"><b @click="() => (mostrarInstrucoes = true)">Como utilizar o mapa?</b></div>

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

const abrigosFiltrados = ref(abrigos.value);
const mostrarFiltros = ref(false);
const mostrarInstrucoes = ref(false);
const mostrarPrivacyPolicy = ref(false);
const currentCity = ref(props.initialCity || 'Todos');

const cities = computed(() => {
  if (!abrigos.value) return [];

  return ["Todos"].concat(
    abrigos.value
      .map((item) => item.city)
      .filter((city, index, self) => self.indexOf(city) === index)
      .filter((city) => city && city != "")
  );
});

const dadosGerais = computed(() => {
  const dadosDefault = { totalVagas: 0, totalVagasOcupadas: 0, percentualOcupacao: 0, cor: "#007972" };

  if (!abrigos.value) return dadosDefault;

  return abrigosFiltrados.value?.reduce((acc, item) => {
    acc.totalVagas += parseInt(item.vagas ?? "0");
    acc.totalVagasOcupadas += parseInt(item.vagas_ocupadas ?? "0");
    acc.percentualOcupacao = (acc.totalVagasOcupadas * 100) / acc.totalVagas;
    acc.cor = calcularCor(acc.totalVagas, acc.totalVagasOcupadas);
    return acc;
  }, dadosDefault);
});

function filterByCity(city: string) {
  abrigosFiltrados.value = abrigos.value?.filter((abrigo) => city == "Todos" || abrigo.city == city) || [];
  currentCity.value = city;
}

function centerMap(city: string) {
  if (!abrigosFiltrados.value) return;

  const [first] = abrigosFiltrados.value;
  const all = city === 'Todos';

  useMapbox("map", (map) => {
    map.flyTo({
      center: all ? defaultCenter : [first.longitude, first.latitude],
      zoom: all ? 7 : 12,
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

useHead({
  title: 'Localização dos abrigos',
});
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
  position: absolute;
  bottom: 0;
  border-radius: 8px 8px 0 0;
  left: 50%;
  transform: translateX(-50%);


  h2 {
    font-size: 14px;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .privacy-policy-button {
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
</style>