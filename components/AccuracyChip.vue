<script lang="ts" setup>
const props = defineProps([
  'accuracy',
]);

function formatDistance(distance: number) {
  return {
    color: distance <= 10 ? 'green' : distance <= 100 ? 'orange' : 'red',
    suffix: distance >= 1000 ? 'km' : ' metros',
    value: distance >= 1000 ? (distance / 1000).toFixed(2) : Math.floor(distance),
  };
}

const accuracy = computed(() => formatDistance(props.accuracy));
</script>

<template>
  <v-chip
    v-if="accuracy.value"
    :color="accuracy.color"
  >
    {{ accuracy.value }}{{ accuracy.suffix }}
  </v-chip>
</template>
