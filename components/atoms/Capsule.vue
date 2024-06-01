<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { iconName, content } = defineProps<{ iconName: string | null; content: string }>();
</script>

<template>
  <div class="capsule-container">
    <Icon
      v-if="iconName"
      :icon="iconName"
      height="12px"
      color="#3E3E3E"
    />

    <p>{{ content }}</p>
  </div>
</template>

<style scoped>
  .capsule-container {
    @apply
      flex
      items-center
      justify-center
      bg-[#F1F1F1]
      h-[30px]
      px-[12px]
      rounded-3xl
  }

  .capsule-container p {
    @apply
      text-[#3E3E3E]
      text-[12px]
  }

  .capsule-container svg + p {
    @apply
      ml-2
  }
</style>
