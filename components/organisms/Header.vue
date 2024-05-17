<template>
  <div v-if="isOpen" class="background-layer" @click="onCloseMenu"/>

   <header class="header-wrapper">
      <AbrigaRsLogo />
      <MenuButton :isOpen="isOpen" @on-click="handleMenuPress"/>

      <MobileMenu
        :isOpen="isOpen"
        :selectedItem="selectedItem"
        @on-select="handleSelect"
        @on-close="onCloseMenu"
      />
  </header>
</template>

<script setup lang="ts">
  const isOpen = ref(false);
  const selectedItem = ref('shelter_map'); 

  const handleSelect = (item: MenuItem) => {
    selectedItem.value = item;
    isOpen.value = false;
  }

  const handleMenuPress = () => {
    isOpen.value = !isOpen.value;
  }

  const onCloseMenu = () => {
    isOpen.value = false;
  }

</script>

<style lang="scss" scoped>
 .header-wrapper {
    @apply
      flex
      h-[64px]
      w-full
      bg-white
      items-center
      flex
      z-50
      px-4
      relative
      mobile:justify-center
      laptop:justify-between
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