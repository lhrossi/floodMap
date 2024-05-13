<template>
  <div class="bg-white p-4 shadow rounded-lg w-[375px] h-[650px] absolute bottom-[40px] left-[24px] z-50">
    <!-- Header -->
    <div class="flex align-center justify-between">
      <div class="bg-[#F1F1F1] px-3 py-2 align-center justify-center rounded-xl flex">
        <Icon icon="flowbite:refresh-outline" height="12px" color="#3E3E3E"/>
        <p class="text-[#3E3E3E] text-sm ml-2">Atualizado 10:48</p>
      </div>

      <!-- CloseButton -->
      <div class="flex w-[24px] h-[24px] rounded-full align-center justify-center cursor-pointer bg-[#E0E0E0]">
        <Icon icon="material-symbols:close" height="16px" color="#3E3E3E"/>
      </div>
    </div>

    <!-- Content Table -->
    <div class="mt-4">
      <h2 class="text-xl font-bold">Igreja Lagoinha Pelotas</h2>

      <div class="mt-4">
        <div class="flex align-center mb-[16px]">
          <Icon icon="majesticons:map-marker" color="#3E3E3E" class="min-w-[24px]"/>
          <p class="ml-[6px] text-[#3E3E3E]">Rua Professor Doutor Araújo, 711 - Centro, Pelotas - RS, CEP: 96020-360</p>
        </div>

        <div class="flex align-start mb-[16px]">
          <Icon icon="carbon:phone-filled" class="min-w-[24px]" color="#3E3E3E"/>
          <p class="ml-[6px] text-[#3E3E3E]">(53) 98135-0728 88 / Nome</p>
        </div>

        <div class="flex align-start">
          <Icon icon="material-symbols:pets" class="min-w-[24px]" color="#3E3E3E"/>
          <p class="ml-[6px] text-[#3E3E3E]">Aceita animais</p>
        </div>
      </div>
    </div>

    <!-- Available Slots Card -->
    <div class="flex flex-column mt-4 rounded-lg overflow-hidden h-[80px]">
      <div class="flex flex-1 bg-[#F1F1F1] align-center justify-center">
        <Icon icon="carbon:user-filled" class="min-h-[20px]" color="#3E3E3E"/>
        <p class="ml-2 text-[#3E3E3E] font-semibold">Pessoas</p>
      </div>

      <div class="flex flex-1 bg-[#E3FBEA] align-center justify-center">
        <p class="text-[#02952B] font-semibold text-sm">20% ocupado</p>
        <div class="w-1 h-1 rounded-full bg-[#02952B] mx-2"/>
        <p class="text-[#02952B] font-semibold text-sm">78 Vagas Livres</p>
        <p class="text-[#3E3E3E] font-semibold text-sm ml-1">de 1234</p>
      </div>
    </div>

    <h3 class="mt-4 text-lg text-[#020202] font-bold">Necessidades</h3>

    <!-- TODO: Accordion -->
    <div class="w-full bg-red-500 h-[100px]"></div>

    <!-- Footer -->
    <div class="mt-5 border-t border-[#F1F1F1] pt-4">
      <button class="flex w-full h-[40px] rounded-xl bg-[#02952B] relative align-center justify-center hover:opacity-90">
        <Icon icon="mingcute:whatsapp-fill" height="20px" class="absolute left-4" color="#FFF"/>
        <p class="font-semibold text-white">Whatsapp</p>
      </button>

      <div class="flex mt-4 gap-3">
        <button class="relative flex-1 bg-[#E3EDFD] rounded-xl h-[40px] align-center justify-center">
          <Icon icon="tabler:location-filled" height="20px" class="absolute left-4 top-[calc(50%-10px)]" color="#114DE6"/>
          <p class="font-semibold text-[#114DE6]">Direções</p>
        </button>
        <button class="relative flex-1 bg-[#E3EDFD] rounded-xl h-[40px] align-center justify-center">
          <Icon icon="carbon:phone-filled" height="20px" class="absolute left-4 top-[calc(50%-10px)]" color="#114DE6"/>
          <p class="font-semibold text-[#114DE6]">Ligar</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import type { Abrigo } from '~/models/Abrigo';

  const { abrigo } = defineProps<{ abrigo: Abrigo | null }>();

</script>

<style>
 
</style>
