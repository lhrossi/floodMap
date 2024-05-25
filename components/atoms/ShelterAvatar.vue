<template>
  <div class="avatar-container">

  </div>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue';
</script>

<style scoped>
  .avatar-container {
    @apply
      w-[30px]
      h-[30px]
      rounded-full
      relative
      flex
      items-center
      justify-center
      bg-red-500
  }
</style>