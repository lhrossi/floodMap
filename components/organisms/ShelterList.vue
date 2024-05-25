<template>
  <div class="container">
    <div class="header">
      <h2 class="text-header">{{ `Abrigos em ${selectedCity}` }}</h2>
      <button @click="handleSwitchMap" class="toggle-map__button">
        <Icon icon="f7:map-fill" height="16px"/>
        <p class="ml-[6px]">Ver mapa</p>
      </button>
    </div>

    <div class="list-container">
      <ShelterDetailCard 
        v-for="eachShelter in abrigos"
        :key="eachShelter.id"
        :shelter="eachShelter" 
      />
    </div>

  </div>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import type { Abrigo } from '~/models/Abrigo';

  const { abrigos, selectedCity } = defineProps<{ abrigos: Abrigo[], selectedCity: string }>();
  const emit = defineEmits(['onSwitchMap']);

  const handleSwitchMap = () => {
    emit('onSwitchMap')
  }

</script>

<style scoped>
  .container {
    @apply
      max-w-full
      min-h-[80vh]
      bg-[#F1F1F1]
      pt-[32px]
      pb-[32px]
      px-4
  }

  .header {
    @apply
      flex
      items-center
      w-full
      justify-between
      mb-[24px];
  }

  .text-header {
    @apply
      text-xl
      font-bold
      text-[#020202];
  }

  .toggle-map__button {
    @apply
      flex
      items-center
      justify-center
      bg-[#475DFF]
      px-[12px]
      h-[30px]
      text-white
      rounded-3xl;
  }

  .list-container {
    @apply
      overflow-scroll
      max-h-[calc(100vh-160px)]
      animate-appear-from-left
      flex
      flex-col
      gap-[16px]
      w-full
      pb-[200px]
  }
</style>