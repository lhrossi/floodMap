<template>
  <v-container>
    <v-container>
      <v-snackbar v-model="error" multi-line> Falha ao carregar abrigos </v-snackbar>
      <Filtros
        :abrigos="abrigos"
        v-model="mostrarFiltros"
        @closeFilters="() => (mostrarFiltros = false)"
        @filterChange="(a) => (abrigosFiltrados = a)"
      />
      <Modal v-if="mostrarInstrucoes" :click="() => closeModal()">
        <Instrucoes />
      </Modal>
      <div class="total-vagas w-full max-w-72 text-sm text-lg-sm flex flex-col gap-1">
        <div class="total-vagas-percentage text-center" :style="{ backgroundColor: dadosGerais.cor }">
          {{ Math.round(dadosGerais.percentualOcupacao) }}% de ocupação
        </div>
        <div class="statistic flex justify-between">
          <span>Total de vagas:</span> <b>{{ dadosGerais.totalVagas }}</b>
        </div>
        <div class="statistic flex justify-between">
          <span>Vagas ocupadas:</span> <b>{{ dadosGerais.totalVagasOcupadas }}</b>
        </div>
        <PrimaryButton class="primary-button" rounded="xl" color="primary" :click="() => (mostrarFiltros = true)" text="Encontrar abrigo" />
        <div class="instructions text-center w-full"><b @click="() => (mostrarInstrucoes = true)">Como utilizar o mapa?</b></div>
      </div>
      <v-row class="mt-4">
        <v-col>
          <MapboxMap
            map-id="map"
            style="position: absolute; top: 0; bottom: 0; left: 0; width: 100%; height: 100%"
            :options="{
              style: 'mapbox://styles/mapbox/streets-v12',
              center: props.mapCenter,
              zoom: props.mapZoom,
            }"
          >
            <LazyMapboxDefaultMarker
              v-for="abrigo of abrigosFiltrados"
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
                <ComoChegar :abrigo="abrigo" />
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

type Props = {
  mapCenter: number[];
  mapZoom: number;
}

const props = withDefaults(defineProps<Props>(), {
  mapCenter: () => [-50.951117644156055, -30.744639003988283],
  mapZoom: 7
});

const token = useRoute().query.token as string;

const requestUrl = token ? `/api/abrigos?token=${new URLSearchParams(token).toString()}` : "/api/abrigos";

const { data: abrigos, error } = await useFetch<any>(requestUrl, {});

const abrigosFiltrados = ref(abrigos.value);
const mostrarFiltros = ref(false);

const mostrarInstrucoes = ref(false);

const dadosGerais = computed(() => {
  const dadosDefault = { totalVagas: 0, totalVagasOcupadas: 0, percentualOcupacao: 0, cor: "#007972" };

  if (!abrigos.value) return dadosDefault;

  return abrigosFiltrados.value.reduce((acc, item) => {
    acc.totalVagas += parseInt(item.vagas ?? "0");
    acc.totalVagasOcupadas += parseInt(item.vagas_ocupadas ?? "0");
    acc.percentualOcupacao = (acc.totalVagasOcupadas * 100) / acc.totalVagas;
    acc.cor = calcularCor(acc.totalVagas, acc.totalVagasOcupadas);
    return acc;
  }, dadosDefault);
});

useHead({ titleTemplate: () => "Localização dos abrigos" });

const mapRef = useMapboxRef("map");

watch(
  [abrigosFiltrados],
  () => {
    useMapbox("map", (map: any) => {
      map._markers.forEach(({ _popup: popup }: any) => {
        popup.remove();
      });
    });
  },
  { deep: true }
);

const closeModal = () => {
  console.log("callued");
  mostrarFiltros.value = false;
  mostrarInstrucoes.value = false;
};
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
  position: fixed;
  z-index: 3;
  bottom: 1%;
  left: 50%;
  transform: translate(-50%, -10%);
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ddd;

  &-percentage {
    padding: 4px 8px 4px 8px;
    border-radius: 50px;
    width: fit-content;
    color: white;
    font-weight: 500;
  }

  .statistic {
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: 0.005em;
    text-align: left;
  }

  .instructions b {
    line-height: 1.5rem;
    letter-spacing: 0.005em;
    text-align: left;
    cursor: pointer;
  }
}

.filtros {
  padding: 1rem;
  gap: 0.5rem;
}
</style>