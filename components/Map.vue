<template>
  <GoogleMap
    ref="mapRef"
    :styles="[
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ]"
    :fullscreen-control="false"
    :street-view-control="false"
    :map-type-control="false"
    :api-key="config.public.GMAPS_KEY"
    style="
      position: absolute;
      top: 64px;
      bottom: 0;
      left: 0;
      width: 100%;
      height: calc(100% - 64px);
    "
    :center="{ lat: -30.1088701, lng: -51.1771419 }"
    :zoom="11"
    @click="closeAll"
  >
    <Marker
      v-if="showAbrigos"
      v-for="abrigo of props.abrigos"
      @click="closeAll"
      :key="abrigo.id"
      :options="{
        icon: makeMarker(Number(abrigo.vagas), Number(abrigo.vagas_ocupadas)),
        position: { lat: abrigo.latitude, lng: abrigo.longitude },
      }"
    >
      <InfoWindow class="p-2 flex flex-col gap-2 w-96" ref="infoWindowRef">
        <h3 class="font-bold text-xl capitalize" v-if="abrigo.nome">
          {{ abrigo.nome }}
        </h3>

        <div v-if="abrigo.address" class="flex gap-2 items-center">
          <v-icon icon="mdi-map-marker" />

          <span class="text-base">{{ abrigo.address }}</span>
        </div>

        <div
          v-if="abrigo.nome_contato || abrigo.telefone"
          class="flex gap-2 items-center"
        >
          <v-icon icon="mdi-phone-alert" />

          <span class="text-base capitalize">
            {{ abrigo.nome_contato }}

            <span v-if="abrigo.nome_contato && abrigo.telefone"> - </span>

            <a class="underline" :href="`tel:${abrigo.telefone}`">{{
              abrigo.telefone
            }}</a>
          </span>
        </div>

        <div class="my-2 flex flex-col gap-4">
          <ContagemVagas :abrigo="abrigo" />
          <Necessidades :abrigo="abrigo" />
        </div>

        <a
          class="text-lg font-semibold py-2 bg-cyan-700 text-white text-center rounded"
          :href="`https://www.google.com/maps/dir/${abrigo.latitude},${abrigo.longitude}`"
          target="_blank"
          rel="noopener noreferrer"
          >Como Chegar</a
        >
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>

<script setup lang="ts">
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import type { Abrigo } from "~/types/abrigo";
import color from "color";

const config = useRuntimeConfig();
const mapRef = ref<any>(null);
const infoWindowRef = ref<any>(null);

const showAbrigos = computed(() => mapRef.value?.ready);

const closeAll = () => {
  infoWindowRef.value.forEach((i: any) => i.close());
};

const makeMarker = (vagas: number, vagasOcupadas: number) => {
  var pinSVGFilled =
    "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";

  return {
    path: pinSVGFilled,
    fillOpacity: 1,
    fillColor: color(calcularCor(vagas, vagasOcupadas))
      .lighten(0.2)
      .desaturate(0.5)
      .hex(),
    strokeWeight: 2,
    strokeColor: color(calcularCor(vagas, vagasOcupadas)).darken(0.3).hex(),
    scale: 2,
    anchor: {
      x: 12,
      y: 17,
    },
  };
};

const props = defineProps<{ abrigos: Abrigo[] }>();
</script>
