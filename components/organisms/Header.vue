<script setup lang="ts">
import type { MenuItem } from '~/models/MenuItem';

const props = defineProps<{ selectedItem: MenuItem; onChangeItem: (item: MenuItem) => void }>();

const isOpen = ref(false);

function handleSelect(item: MenuItem) {
  isOpen.value = false;
  props.onChangeItem(item);
}

function handleMenuPress() {
  isOpen.value = !isOpen.value;
}

function onCloseMenu() {
  isOpen.value = false;
}
</script>

<template>
  <div
    v-if="isOpen"
    class="background-layer"
    @click="onCloseMenu"
  />

  <header class="header-wrapper">
    <AbrigaRsLogo />

    <MenuButton
      :is-open="isOpen"
      @on-click="handleMenuPress"
    />

    <MobileMenu
      :is-open="isOpen"
      :selected-item="props.selectedItem"
      @on-select="handleSelect"
      @on-close="onCloseMenu"
    />

    <DesktopMenu @on-select="handleSelect" />
  </header>
</template>

<style lang="scss" scoped>
 .header-wrapper {
    @apply
      flex
      h-[64px]
      w-full
      bg-white
      items-center
      z-[30]
      mobile:px-4
      laptop:px-8
      relative
      mobile:justify-center
      laptop:justify-between
      fixed
      top-0
      left-0
  }

  .background-layer {
    @apply
      fixed
      top-0
      left-0
      right-0
      bottom-0
      bg-black/50 z-20
      animate-fade-in
  }
</style>
