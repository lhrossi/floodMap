<script setup lang="ts">
import type { MenuItem } from '~/models/MenuItem';

const emit = defineEmits([
  'onSelect',
]);

function handleSelect(item: MenuItem) {
  emit('onSelect', item);
}

function handleAboutClick() {
  window.open('/about', '_blank').focus();
}
</script>

<template>
  <ul class="menu-container">
    <li
      class="menu-item menu-item__selected"
      @click="() => handleSelect('shelter_map')"
    >
      <p>Mapa de abrigos</p>

      <div class="underline" />
    </li>

    <li
      class="menu-item"
      @click="() => handleSelect('how_to_use')"
    >
      <p>Como usar o mapa</p>

      <div class="underline" />
    </li>

    <li
      class="menu-item"
      @click="handleAboutClick"
    >
      <p>Sobre</p>

      <div class="underline" />
    </li>

    <div class="divider" />

    <li
      class="menu-item mr-0"
      @click="() => handleSelect('login')"
    >
      <p>Login</p>

      <div class="underline" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .menu-container {
    @apply
      mobile:hidden
      laptop:flex
      items-center
  }

  .menu-item {
    @apply
      transition-all
      duration-100
      cursor-pointer
      text-[#020202]
      relative
      mr-6;

    &:hover {
      @apply
        text-[#1351B4]
        font-bold;

      .underline {
        @apply
          opacity-100
      }
    }
  }

  .menu-item__selected {
    @apply
      text-[#1351B4]
      font-bold;

    .underline {
      @apply
        opacity-100
    }
  }

  .underline {
    @apply
      absolute
      left-0
      bottom-[-4px]
      h-[3px]
      w-full
      bg-[#1351B4]/25
      opacity-0
  }

  .divider {
    @apply
      h-[24px]
      mr-6
      bg-red-500
      w-[1px]
      bg-[#C3C3C3]
  }
</style>
