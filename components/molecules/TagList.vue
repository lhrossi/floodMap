<template>
  <div class="tag-list-container">
    <Tag :key="eachTag.item"
      v-for="eachTag in data"
      :content="eachTag.item"
      :quantity="eachTag.quantidade"
    />
  </div>
</template>

<script setup lang="ts">
  import type { Necessidade } from '~/models/Abrigo';
  const { data } = defineProps<{ data: Necessidade[]}>();
</script>

<style scoped>
  .tag-list-container {
    @apply
      flex
      flex-wrap
      gap-[4px]
  }
</style>