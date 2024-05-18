<template>
  <ul class="menu-container">
    <li @click="() => handleSelect('shelter_map')" class="menu-item menu-item__selected">
      <p>Mapa de abrigos</p>
      <div class="underline"/>
    </li>
    <li @click="() => handleSelect('how_to_use')" class="menu-item">
      <p>Como usar o mapa</p>
      <div class="underline"/>
    </li>
    <li @click="() => handleSelect('about')" class="menu-item">
      <p>Sobre</p>
      <div class="underline"/>
    </li>
    <li @click="() => handleSelect('privacy_policy')" class="menu-item mb-0">
      <p>Política de privacidade</p>
      <div class="underline"/>
    </li>

    <div class="divider"/>

    <li @click="() => handleSelect('login')" class="menu-item mr-0">
      <p>Login</p>
      <div class="underline"/>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { Icon } from '@iconify/vue'; 
  import type { MenuItem } from '~/models/MenuItem';

  const props = defineProps<{ selectedItem: MenuItem }>();
  const emit = defineEmits(['onSelect'])

  const selectedItem = toRef(props, 'selectedItem')
  const isOpen = toRef(props, 'isOpen')

  const handleSelect = (item: MenuItem) => {
    emit('onSelect', item)
  }

</script>

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