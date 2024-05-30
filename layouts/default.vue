<script setup lang="ts">
import type { MenuItem } from '~/models/MenuItem';

const selectedMenuItem = ref<MenuItem>('shelter_map');

function handleResetMenuItem() {
  selectedMenuItem.value = 'shelter_map';
}

function handleChangeItem(item: MenuItem) {
  selectedMenuItem.value = item;
}

provide('selectedMenuItem', selectedMenuItem);
provide('resetMenuItem', handleResetMenuItem);
</script>

<template>
  <Header
    :selected-item="selectedMenuItem"
    :on-change-item="handleChangeItem"
  />

  <v-main>
    <Modal
      :open="selectedMenuItem === 'about'"
      @close="() => handleChangeItem('shelter_map')"
    >
      <AboutModal />
    </Modal>

    <slot />
  </v-main>
</template>
