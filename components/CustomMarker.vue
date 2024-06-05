<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { defineMapboxMarker } from '#imports';
import type { Abrigo } from '~/models/Abrigo';
import { OccupationType } from '~/models/Occupation';
import OccupationUtils from '~/utils/occupationUtils';

const { abrigo, markerId } = defineProps<{ abrigo: Abrigo; markerId: string }>();

const emit = defineEmits([
  'onClick',
]);

const occupationUtils = computed(() => new OccupationUtils(abrigo));

const markerProps = computed(() => ({
  type: occupationUtils.value.abrigoOccupationType,
  iconName: occupationUtils.value.abrigoOccupationType === OccupationType.Pet
    ? 'material-symbols:pets' : 'carbon:user-filled',
  statusColor: occupationUtils.value.abrigoStatusColor.marker,
  backgroundColor: occupationUtils.value.abrigoMarkerColor,
}));

const latAndLng = [
  abrigo.longitude,
  abrigo.latitude,
];

const options = {
  color: markerProps.value.statusColor,
  lnglat: latAndLng,
};

const markerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  defineMapboxMarker(markerId, options, markerRef, (marker) => {
    marker.setLngLat(latAndLng);
    marker._element.addEventListener('click', () => {
      emit('onClick');
      useTrackEvent('click_shelter', {
        shelter_id: abrigo.id,
        shelter_name: abrigo.nome,
      });
    });
  });
});
</script>

<template>
  <div hidden>
    <div
      ref="markerRef"
      class="w-[44px] h-[44px] rounded-full relative flex align-center justify-center shadow-[0_0_2px_#000]"
      :style="{
        backgroundColor: markerProps.backgroundColor,
      }"
    >
      <Icon
        v-if="markerProps.type !== 'both'"
        :icon="markerProps.iconName"
        height="24px"
        color="#fff"
      />

      <div
        v-else
        class="flex relative align-center justify-center"
      >
        <Icon
          icon="carbon:user-filled"
          height="20px"
          color="#fff"
          class="absolute left-[calc(50%-7px)] translate-x-[-50%]"
        />

        <div />

        <Icon
          icon="material-symbols:pets"
          height="20px"
          color="#fff"
          class="absolute left-[calc(50%+7px)] translate-x-[-50%]"
        />
      </div>

      <div
        class="w-[15px] h-[15px] bg-red-500 absolute top-0 right-0 rounded-full border-2 border-white"
        :style="{
          backgroundColor: markerProps.statusColor,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
  .marker {}
</style>
