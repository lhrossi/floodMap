<template>
  <v-container>
    <v-container>
      <div class="total-vagas">
        Total de vagas: <b>{{ totalVagas }}</b> <br />
        Vagas ocupadas: <b>{{ totalVagasOcupadas }}</b>
      </div>
      <v-row class="mt-4">
        <v-col>
          <MapboxMap
            map-id="map"
            style="
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 100%;
            "
            :options="{
              style: 'mapbox://styles/mapbox/streets-v12',
              center: [-51.1771419, -30.1088701],
              zoom: 9,
            }"
          >
            <LazyMapboxDefaultMarker
              v-for="item of items"
              :marker-id="`marker-${item.id}`"
              :key="item.id"
              :lnglat="[item.longitude, item.latitude]"
              :options="{
                color: calcularCor(item),
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
                <p v-if="item.demanda">{{ item.demanda }}</p>
                <v-divider class="my-2" />
                <div class="flex space-x-2">
                  <v-chip
                    v-if="item.vagas"
                    variant="flat"
                    size="small"
                    color="primary"
                    >{{ item.vagas }} vagas</v-chip
                  >
                  <v-chip
                    v-if="!isNaN(item.vagas) && !isNaN(item.vagas_ocupadas) && item.vagas > 0"
                    variant="flat"
                    size="small"
                    :color="calcularCor(item)"
                    >{{ Math.max(item.vagas - item.vagas_ocupadas, 0) }} livres</v-chip
                  >
                </div>
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
const { data: items } = await useFetch<any>("/api/abrigos", {});

console.log(items);

console.log(Array.from(items));

const totalVagas = computed(() =>
  items.value.reduce((acc: any, item: any) => {
    const value = parseInt(item.vagas);
    if (isNaN(value)) {
      return acc;
    }
    return acc + value;
  }, 0)
);

const totalVagasOcupadas = computed(() =>
  items.value.reduce((acc: any, item: any) => {
    const value = parseInt(item.vagas_ocupadas);
    if (isNaN(value)) {
      return acc;
    }
    return acc + value;
  }, 0)
);

console.log(JSON.stringify(items.value));

useHead({
  titleTemplate: () => "Localização dos abrigos",
});

useMapbox("map", (map: any) => {
  map._markers.forEach(({ _popup: popup }: any) => {
    popup.remove();
  });
});

function calcularCor(item: any) {
  if (isNaN(item.vagas) || isNaN(item.vagas_ocupadas) || item.vagas <= 0) {
    return "lightgrey";
  }
  const percentual = (item.vagas_ocupadas * 100) / item.vagas;
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
</style>
