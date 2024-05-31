<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Abrigo } from '~/models/Abrigo';

const props = defineProps<{ abrigos: Abrigo[]; selectedCity: string }>();
const emit = defineEmits([
  'onSwitchMap',
]);

const abrigos = toRef(props, 'abrigos');
const selectedCity = toRef(props, 'selectedCity');

const scrollRef = ref<HTMLDivElement | null>(null);

function handleSwitchMap() {
  emit('onSwitchMap');
}

function scrollToTop() {
  if (scrollRef.value) {
    scrollRef.value.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }
}

watch(abrigos, async () => {
  await nextTick();
  scrollToTop();
});
</script>

<template>
  <div class="container">
    <div class="header">
      <h2 class="text-header">
        {{ selectedCity === 'Todos' ? 'Abrigos' : `Abrigos em ${selectedCity}` }}
      </h2>

      <button
        class="toggle-map__button"
        @click="handleSwitchMap"
      >
        <Icon
          icon="f7:map-fill"
          height="16px"
        />

        <p class="ml-[6px] min-w-max">
          Ver mapa
        </p>
      </button>
    </div>

    <div
      ref="scrollRef"
      class="list-container"
    >
      <ShelterDetailCard
        v-for="eachShelter in abrigos"
        :key="eachShelter.id"
        :shelter="eachShelter"
      />
    </div>
  </div>
</template>

<style scoped>
  .container {
    @apply
      max-w-full
      bg-[#F1F1F1]
      pt-[32px]
      pb-[32px]
      px-4

      laptop:flex
      laptop:items-center
      laptop:flex-col
      laptop:px-[15%]
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
      ml-2
      rounded-3xl;
  }

  .list-container {
    @apply
      overflow-auto
      mobile:max-h-[calc(100vh-200px)]    /* laptop:max-h-full */
      animate-appear-from-left
      flex
      flex-col
      gap-[16px]
      w-full
      pb-[200px]
  }
</style>
