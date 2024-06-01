<script setup lang="ts">
import citiesCoordinates from '~/config/citiesCoordinates';

const { city } = useRoute().params;
const cityData = citiesCoordinates[city as string];

onBeforeMount(() => {
  if (!cityData) {
    history.pushState(
      {},
      '',
      '/',
    );
  }
});
</script>

<template>
  <MainPage
    :map-center="cityData ? [cityData.lng, cityData.lat] : undefined"
    :map-zoom="cityData?.initialZoom"
    :initial-city="cityData?.filterBySlug"
  />
</template>

<style lang="scss">
//
</style>
