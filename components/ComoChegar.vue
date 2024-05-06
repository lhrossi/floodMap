<template>
  <v-divider class="my-2" />
  <a
    class="d-flex justify-end"
    :href="`https://www.google.com/maps/dir//${abrigo.latitude},${abrigo.longitude}`"
    target="_blank"
    rel="noopener noreferrer"
    >Como Chegar</a
  >
</template>

<script setup lang="ts">
defineProps<{ abrigo: any }>();
</script>
