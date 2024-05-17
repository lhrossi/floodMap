<template>
  <div class="menu-container" :class="isOpen ? 'menu-container__active' : ''">
    <ul>
      <li @click="() => handleSelect('shelter_map')" 
        class="menu-item" :class="selectedItem === 'shelter_map' ? 'menu-item__selected' : ''"
      >
        Mapa de abrigos
      </li>
      <li @click="() => handleSelect('how_to_use')" 
        class="menu-item" :class="selectedItem === 'how_to_use' ? 'menu-item__selected' : ''"
      >
        Como usar o mapa
      </li>
      <li @click="() => handleSelect('about')"
        class="menu-item" :class="selectedItem === 'about' ? 'menu-item__selected' : ''"
      >
        Sobre
      </li>
      <li @click="() => handleSelect('about')"
        class="menu-item mb-0" :class="selectedItem === 'policy_privacy' ? 'menu-item__selected' : ''"
      >
        Política de privacidade
      </li>
      <div class="divider"/>
      <li @click="() => handleSelect('about')" class="menu-item mb-0">
        Login
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';

  type MenuItem = 'shelter_map' | 'how_to_use' | 'about' | 'policy_privacy' | 'login';

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
</style>