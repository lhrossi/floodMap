<template>
  <v-btn 
    variant="text" 
    prepend-icon="mdi-map-marker-radius" 
    stacked 
    :href="link" 
    target="_blank"
  >
    Como Chegar?
  </v-btn>
</template>

<script setup>
const props = defineProps({
  origem: {
    type: Array,
    default: () => [0, 0],
  },
  destino: {
    type: Array,
    default: () => [0, 0],
  },
})

const link = computed(() => {
  return `https://www.google.com/maps/dir/${props.origem.reverse().join(',')}/${props.destino.reverse().join(',')}`
})
</script>

<style lang="scss" scoped>

</style>