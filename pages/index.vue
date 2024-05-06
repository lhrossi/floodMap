<template>
  <v-container>
    <v-container>
      <v-snackbar v-model="error" multi-line> Falha ao carregar abrigos </v-snackbar>
      <div class="total-vagas">
        <div>
          Total de vagas: <b>{{ dadosGerais.totalVagas }}</b>
        </div>
        <div>
          Vagas ocupadas: <b>{{ dadosGerais.totalVagasOcupadas }}</b>
        </div>
        <div class="text-lg font-bold text-center" :style="{ color: dadosGerais.cor }">{{ Math.round(dadosGerais.percentualOcupacao) }}%</div>
        <v-btn size="small" v-on:click="mostrarFiltros = true"> Filtrar abrigos </v-btn>
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
      <Filtros :abrigos="abrigos" v-model="mostrarFiltros" @filterChange="(a) => (abrigosFiltrados = a)" />
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import calcularCor from "../utils/calcularCor";

const { data: abrigos, error } = await useFetch<any>("/api/abrigos", {});

const abrigosFiltrados = ref(abrigos.value);
const mostrarFiltros = ref(false);

const dadosGerais = computed(() => {
  const dadosDefault = { totalVagas: 0, totalVagasOcupadas: 0, percentualOcupacao: 0, cor: "" };

  if (!abrigos.value) return dadosDefault;

  return abrigos.value.reduce((acc, item) => {
    acc.totalVagas += parseInt(item.vagas ?? "0");
    acc.totalVagasOcupadas += parseInt(item.vagas_ocupadas ?? "0");
    acc.percentualOcupacao = (acc.totalVagasOcupadas * 100) / acc.totalVagas;
    acc.cor = calcularCor(acc.totalVagas, acc.totalVagasOcupadas);
    return acc;
  }, dadosDefault);
});

useHead({ titleTemplate: () => "Localização dos abrigos" });

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
  z-index: 899;
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
