<script setup lang="ts">
import AboutPage from '~/components/AboutPage.vue';
import ContactPage from '~/components/ContactPage.vue';
import VolunteersPage from '~/components/VolunteersPage.vue';
import type { DefineComponent } from 'vue';
import { defineComponent } from 'vue';

definePageMeta({
  layout: 'empty',
});

interface Components {
  [key: string]: Component;
}

const component = ref('about');

const components: Components = {
  about: AboutPage,
  volunteers: VolunteersPage,
  contact: ContactPage,
};

const currentComponent = computed(() => components[component.value]);

function handleListClick(page: string) {
  component.value = page;
}
</script>

<template>
  <AboutPageHeader
    :current-page="component"
    @list-item-click="handleListClick"
  />

  <transition
    name="fade"
    mode="out-in"
  >
    <component
      :is="currentComponent"
      :key="currentComponent"
    />
  </transition>
</template>

<style lang="scss">
body, html {
  overflow-y: scroll;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
