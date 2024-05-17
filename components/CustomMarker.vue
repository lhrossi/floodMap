<template>
  <div hidden>
    <div 
      ref="markerRef"
      class="w-[44px] h-[44px] rounded-full relative flex align-center justify-center shadow-[0_0_2px_#000]"
      :style="{ 
          backgroundColor: markerProps.backgroundColor,
        }"
    >
      <Icon v-if="markerProps.type !== 'both'" :icon="markerProps.iconName" height="24px" color="#fff"/>
      <div v-else class="flex relative align-center justify-center">
        <Icon icon="carbon:user-filled" height="20px" color="#fff" class="absolute left-[calc(50%-7px)] translate-x-[-50%]"/>
        <div>
          
        </div>
        <Icon icon="material-symbols:pets" height="20px" color="#fff" class="absolute left-[calc(50%+7px)] translate-x-[-50%]"/>
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

<script setup lang="ts">
  import { ref } from 'vue';
  import { defineMapboxMarker } from '#imports';
  import type { Abrigo } from '~/models/Abrigo';
  import { Icon } from '@iconify/vue';
  
  const { abrigo, markerId } = defineProps<{ abrigo: Abrigo, markerId: string }>();
  const emit = defineEmits(['onClick'])

  const markerProps = computed(() => {
    const isPerson = abrigo.vagas_ocupadas && parseInt(abrigo.vagas_ocupadas) > 0;
    const isPet = abrigo?.vagas_pet && parseInt(abrigo.vagas_pet) > 0; 
    const isBoth = isPerson && isPet;

    const backgroundColor = isBoth ? "#FF1183" : isPet ? "#9747FF" : "#4759FF";

    return {
      type: isBoth ? "both" : isPet ? "pet" : "person",
      iconName: isPet ? "material-symbols:pets" : "carbon:user-filled",
      statusColor: calcularCor(abrigo.vagas, abrigo.vagas_ocupadas),
      backgroundColor: backgroundColor,
    }
  })

  const latAndLng = [abrigo.longitude, abrigo.latitude]

  const options = {
    color: calcularCor(abrigo.vagas, abrigo.vagas_ocupadas),
    lnglat: latAndLng,
  }

  const markerRef = ref<HTMLElement | null>(null);

  onMounted(() => {
    defineMapboxMarker(markerId, options, markerRef, (marker) => {
      marker.setLngLat(latAndLng)
      marker._element.addEventListener("click", () => {
        emit('onClick')
      });
    })
  })
</script>

<style scoped>
  .marker {}
</style>
