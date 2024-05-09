<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-btn v-bind="props" :color="color"  :rounded="rounded" :size="size" @click="click" :class="{ 'full-width': fullWidth, 'primary-button': true }" 
    >{{text}}</v-btn>
  </v-hover>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  color: String,
  rounded: String,
  size: String,
  click: Function,
  text: String,
  fullWidth: Boolean
})
</script>

<style lang="scss">
  .primary-button:hover {
    background-color: #FC8D22 !important;
  }
  .full-width {
    width: 100%;
  }
</style>