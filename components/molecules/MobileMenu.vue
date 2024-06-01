<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { MenuItem } from '~/models/MenuItem';

const props = defineProps<{ selectedItem: MenuItem; isOpen: boolean }>();
const emit = defineEmits([
  'onSelect',
]);

const isOpen = toRef(props, 'isOpen');

function handleSelect(item: MenuItem) {
  emit('onSelect', item);
}
</script>

<template>
  <div
    class="menu-container"
    :class="isOpen ? 'menu-container__active' : ''"
  >
    <ul>
      <li
        class="menu-item menu-item__selected"
        @click="() => handleSelect('shelter_map')"
      >
        Mapa de abrigos
      </li>

      <li
        class="menu-item"
        @click="() => handleSelect('how_to_use')"
      >
        Como usar o mapa
      </li>

      <li
        class="menu-item"
        @click="() => handleSelect('about')"
      >
        Sobre
      </li>

      <li
        class="menu-item mb-0"
        @click="() => handleSelect('privacy_policy')"
      >
        Política de privacidade
      </li>

      <div class="divider" />

      <li
        class="menu-item login-button"
        @click="() => handleSelect('login')"
      >
        <Icon
          icon="tabler:login-2"
          height="20px"
          color="#434343"
        />

        <p class="ml-2 text-[#434343]">
          Login
        </p>
      </li>
    </ul>
  </div>
</template>

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
