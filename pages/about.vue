<script setup lang="ts">
definePageMeta({
  layout: 'empty',
});

const component: Ref<'about' | 'volunteers' | 'contact'> = ref('about');

function handleListClick(page: 'about' | 'volunteers' | 'contact') {
  component.value = page;
}
</script>

<template>
  <AboutPageHeader
    :current-page="component"
    @list-item-click="handleListClick"
  />

  <AboutPage v-if="component === 'about'" />
</template>

<style lang="scss">
body, html {
  overflow-y: scroll;
}
</style>
