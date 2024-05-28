<script setup lang="ts">
const { content } = defineProps<{ content: string; quantity: number }>();
</script>

<template>
  <div class="tag-container">
    <p>{{ `${content}${quantity > 0 ? ` (${quantity})` : ''}` }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .tag-container {
    @apply
      flex
      items-center
      justify-center
      bg-[#F1F1F1]
      min-h-[20px]
      py-[4px]
      px-[8px]
      rounded-3xl;

      p {
        @apply
          text-[#020202]
          text-[12px]
          font-[500]
      }
  }
</style>
