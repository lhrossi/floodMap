<template>
  <div class="menu-container" :class="isOpen ? 'menu-container__active' : ''">
    <ul>
      <li @click="() => handleSelect('shelter_map')" class="menu-item menu-item__selected">
        Mapa de abrigos
      </li>
      <li @click="() => handleSelect('how_to_use')" class="menu-item">
        Como usar o mapa
      </li>
      <li @click="() => handleSelect('about')" class="menu-item">
        Sobre
      </li>
      <li @click="() => handleSelect('privacy_policy')" class="menu-item mb-0">
        Política de privacidade
      </li>
      <div class="divider"/>
      <li @click="() => handleSelect('login')" class="menu-item login-button">
        <Icon icon="tabler:login-2" height="20px" color="#434343" />
        <p class="ml-2 text-[#434343]">Login</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { Icon } from '@iconify/vue'; 
  import type { MenuItem } from '~/models/MenuItem';

  const props = defineProps<{ selectedItem: MenuItem, isOpen: boolean }>();
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
      bg-white
      w-full
      absolute
      bottom-[1px]
      transform
      translate-y-[-100%]
      left-0
      pt-4
      px-4
      pb-5
      z-10
      laptop:hidden
  }

  .menu-container__active {
    @apply
      translate-y-[100%]
      animate-fade-in
    }

  .menu-item {
    @apply
      transition-all 
      duration-100
      mb-3
      cursor-pointer
      text-[#020202]
      w-fit
  }

  .menu-item__selected {
    @apply
      text-[#1351B4]
      font-bold
  }

  .divider {
    @apply
      w-full
      my-[24px]
      h-[1px]
      bg-[#C3C3C3]
  }

  .login-button {
    @apply
      flex
      items-center
      justify-center
      mb-0
  }
</style>