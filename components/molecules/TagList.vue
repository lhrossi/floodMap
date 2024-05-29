<script setup lang="ts">
import type { Necessidade } from '~/models/Abrigo';

const { data } = defineProps<{ data: Necessidade[] }>();
</script>

<template>
  <div class="tag-list-container">
    <Tag
      v-for="eachTag in data"
      :key="eachTag.item"
      :content="eachTag.item"
      :quantity="eachTag.quantidade"
    />
  </div>
</template>

<style scoped>
  .tag-list-container {
    @apply
      flex
      flex-wrap
      gap-[4px]
  }
</style>
