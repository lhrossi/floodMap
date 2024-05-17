<template>
  <div @click="handleClick" class="hamburger-menu" :class="isOpen ? 'hamburger-menu__active' : ''">
    <div class="menu-button" />
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const { isOpen } = defineProps<{ isOpen: boolean }>();
  const emit = defineEmits(['onClick'])

  const handleClick = () => {
    emit('onClick')
  }
</script>

<style lang="scss" scoped>
  .hamburger-menu {
    @apply
      absolute
      left-4
  }

  .menu-button {
    @apply
      w-5
      h-[2px]
      bg-black
      rounded-full
      transition-all
      duration-150
      before:content-['']
      before:absolute
      before:w-5
      before:h-[2px]
      before:bg-black
      before:rounded-full
      before:-translate-y-1.5
      before:transition-all
      before:duration-150
      after:content-['']
      after:absolute
      after:w-5
      after:h-[2px]
      after:bg-black
      after:rounded-full
      after:translate-y-1.5
      after:transition-all
      after:duration-150
  }

  .hamburger-menu__active {
    @apply
      [&>div]:h-0
      [&>div]:bg-white
      [&>div]:before:translate-y-0
      [&>div]:before:rotate-45
      [&>div]:after:translate-y-0
      [&>div]:after:-rotate-45
  }
</style>
