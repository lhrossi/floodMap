<script setup lang="ts">
const props = defineProps<{
  data: Record<string, any>;
  city: string;
  cities: Array<any>;
}>();

const emit = defineEmits([
  'showFilters',
  'updateCity',
]);

const color = computed(() => occupationUtils.getOccupationColorByOccupationPercentage(props.data.percentualOcupacao).text);

const backgroundColor = computed(() => hexToRGBA(color.value, 0.15));

function updateCity(value: string) {
  emit('showFilters', value);
}

function showFilters() {
  emit('updateCity');
}
</script>

<template>
  <div class="floating-bar">
    <div class="floating-bar__actions">
      <CustomSelect
        :value="city"
        :items="cities"
        @change="updateCity"
      />

      <v-btn
        color="#E3EDFD"
        rounded="xl"
        class="!text-base !text-[#114DE6] !normal-case"
        flat
        @click="showFilters"
      >
        Filtros
      </v-btn>
    </div>

    <div
      class="floating-bar__info"
      :style="{ color, backgroundColor }"
    >
      <strong class="font-bold text-current">{{ Math.round(data.percentualOcupacao) }}% Ocupado</strong>

      <span class="text-[10px]">●</span>

      <strong class="font-bold text-current">{{ data.totalVagas - data.totalVagasOcupadas }} Vagas Livres <span class="text-gray-700">de {{ data.totalVagas }}</span></strong>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.floating-bar {
  @apply w-full max-w-full fixed bottom-0 left-0 bg-white z-10 md:w-[40vw] md:min-w-[400px] md:max-w-[600px] md:bottom-9 md:left-1/2 md:rounded-3xl md:-translate-x-1/2;

  &__actions {
    @apply flex items-center gap-4 p-4;

    :deep(.v-btn__content) {
      letter-spacing: 0;
    }
  }

  &__info {
    @apply flex justify-center gap-1 p-3 text-xs md:rounded-b-3xl;
  }
}
</style>
