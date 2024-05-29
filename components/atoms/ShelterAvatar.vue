<script setup lang="ts">
import type OccupationUtils from '~/utils/occupationUtils';
import { OccupationType } from '~/models/Occupation';
import { Icon } from '@iconify/vue';

const { occupationUtils } = defineProps<{ occupationUtils: OccupationUtils }>();

const markerProps = computed(() => ({
  type: occupationUtils.abrigoOccupationType,
  iconName: occupationUtils.abrigoOccupationType === OccupationType.Pet
    ? 'material-symbols:pets' : 'carbon:user-filled',
  statusColor: occupationUtils.abrigoStatusColor.marker,
  backgroundColor: occupationUtils.abrigoMarkerColor,
}));
</script>

<template>
  <div
    class="avatar-container"
    :style="{ backgroundColor: markerProps.backgroundColor }"
  >
    <Icon
      v-if="markerProps.type !== 'both'"
      :icon="markerProps.iconName"
      height="16px"
      color="#fff"
    />

    <div
      v-else
      class="flex relative align-center justify-center"
    >
      <Icon
        icon="carbon:user-filled"
        height="14px"
        color="#fff"
        class="absolute left-[calc(50%-5px)] translate-x-[-50%]"
      />

      <div />

      <Icon
        icon="material-symbols:pets"
        height="14px"
        color="#fff"
        class="absolute left-[calc(50%+5px)] translate-x-[-50%]"
      />
    </div>

    <div
      class="w-[12px] h-[12px] bg-red-500 absolute top-[-2px] right-[-2px] rounded-full border-2 border-white"
      :style="{
        backgroundColor: markerProps.statusColor,
      }"
    />
  </div>
</template>

<style scoped>
  .avatar-container {
    @apply
      w-[30px]
      h-[30px]
      rounded-full
      relative
      flex
      items-center
      justify-center
      bg-red-500
  }
</style>
