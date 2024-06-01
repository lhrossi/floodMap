<script setup>
defineProps({
  color: String,
  rounded: String,
  size: String,
  click: Function,
  text: String,
  fullWidth: Boolean,
});
</script>

<template>
  <v-hover v-slot="{ props }">
    <v-btn
      v-bind="props"
      :color="color"
      :rounded="rounded"
      :size="size"
      class="primary-button"
      :class="{ 'full-width': fullWidth }"
      @click="click"
    >
      {{ text }}
    </v-btn>
  </v-hover>
</template>

<style lang="scss">
  .primary-button:hover {
    background-color: #FC8D22 !important;
  }
  .full-width {
    width: 100%;
  }
</style>
