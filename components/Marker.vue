<template>
  <LazyMapboxDefaultMarker
    :marker-id="id"
    :lnglat="[abrigo.longitude, abrigo.latitude]"
    :options="{
      color: calcularCor(abrigo.vagas, abrigo.vagas_ocupadas),
    }"
  >
    <Popup
      v-if="abrigo.showPopup"
      :abrigo="abrigo"
    />
  </LazyMapboxDefaultMarker>
</template>

<script setup lang="ts">
const { abrigo } = defineProps<{ abrigo: any }>();

const id = `marker-${abrigo.id}`;

useMapboxMarker(id, (marker) => {
  marker._element.addEventListener("click", () => {
    abrigo.showPopup = true;
  });
});
</script>
