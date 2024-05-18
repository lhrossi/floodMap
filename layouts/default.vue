<template>
  <div class="flex flex-column">
    <Header :selectedItem="selectedMenuItem" :onChangeItem="handleChangeItem"/>
    
    <v-main>
      <Modal :open="selectedMenuItem === 'about'" @close="() => handleChangeItem('shelter_map')">
        <AboutModal />
      </Modal>
      <slot></slot>
    </v-main>
  </div>
</template>

<script setup lang="ts">
  import type { MenuItem } from '~/models/MenuItem';

  const selectedMenuItem = ref<MenuItem>('shelter_map');
  provide('selectedMenuItem', selectedMenuItem);

  const handleChangeItem = (item: MenuItem) => {
    selectedMenuItem.value = item;
  };
</script>
