<template>
  <div class="
    flex flex-column
    mobile:left-0 mobile:w-full mobile:max-h-[80vh] mobile:bottom-0 mobile:transform mobile:animate-appear-from-bottom
    laptop:left-[24px] laptop:bottom-[40px] laptop:w-[375px]
    bg-white p-4 shadow-lg rounded-lg absolute bottom-[40px] pb-[40px] z-50"
  >
    <!-- Header -->
    <div class="flex align-center mb-4" 
        :class="shouldShowLastUpdatedTag ? 'justify-between' : 'justify-end'">
      <div v-if="shouldShowLastUpdatedTag" class="bg-[#F1F1F1] px-3 py-2 align-center justify-center rounded-xl flex">
        <Icon icon="flowbite:refresh-outline" height="12px" color="#3E3E3E"/>
        <p class="text-[#3E3E3E] text-sm ml-2">{{ `Atualizado ${formattedLastUpdated}` }}</p>
      </div>

      <!-- CloseButton -->
      <button @click="handleClose" class="flex w-[24px] h-[24px] rounded-full align-center justify-center cursor-pointer bg-[#E0E0E0] hover:opacity-90">
        <Icon icon="material-symbols:close" height="16px" color="#3E3E3E"/>
      </button>
    </div>

    <div class="flex-1 overflow-auto relative pb-[20px]">
      <!-- Content Table -->
      <div>
        <h2 class="text-xl font-bold">{{ abrigo?.nome }}</h2>

        <div class="mt-4">
          <div v-if="!!abrigo?.address" class="flex align-center mb-[16px]">
            <Icon icon="majesticons:map-marker" color="#3E3E3E" class="min-w-[24px]"/>
            <p class="ml-[6px] text-[#3E3E3E]">{{abrigo?.address }}</p>
          </div>

          <div v-if="hasPhoneNumber" class="flex align-start mb-[16px]">
            <Icon icon="carbon:phone-filled" class="min-w-[24px]" color="#3E3E3E"/>
            <p class="ml-[6px] text-[#3E3E3E]">
              {{ `${abrigo?.telefone} ${abrigo?.nome_contato ? `/ ${abrigo?.nome_contato}` : ''}` }}
            </p>
          </div>

          <div v-if="!!abrigo?.vagas_pet" class="flex align-start">
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

        <div :class="`flex flex-1 align-center justify-center ${occupationColor.background}`" >
          <p :class="`text-[#02952B] font-semibold text-sm ${occupationColor.text}`">
            {{ `${occupationPercentage.replace('.', ',')}% ocupado`  }}
          </p>
          <div :class="`w-1 h-1 rounded-full mx-2 ${occupationColor.bullet}`"/>
          <p :class="`font-semibold text-sm ${occupationColor.text}`">{{ `${availableSlots} Vagas Livres` }}</p>
          <p class="text-[#3E3E3E] font-semibold text-sm ml-1">{{ `de ${abrigo?.vagas || 0}` }}</p>
        </div>
      </div>

      <!-- List of needs -->
      <div 
        v-if="!!abrigo?.itensUteis?.length || isCityCentralizedDonations"
        class="mt-4 relative"
        :class="{ 'pb-[10px]': isCityCentralizedDonations }"
      >
        <h3 class="text-lg text-[#020202] font-bold mb-3">Necessidades</h3>

        <div v-if="isCityCentralizedDonations">
          <p v-if="isManagedByGovern">
            Para doações aos abrigos gerenciados pela prefeitura, por favor, saiba os locais de doação acessando
            <a href="https://prefeitura.poa.br/" target="_blank">https://prefeitura.poa.br/</a>
          </p>
          <p v-else>
            Para doações para esse abrigo, por favor, verifique as
            <a href="https://sos-rs.com/" target="_blank">informações nesse link.</a>
          </p>
        </div>

        <div v-else-if="!!abrigo?.itensUteis?.length">
          <ul class="w-full">
            <li v-for="eachNeed in abrigo.itensUteis.filter((eachItem) => eachItem.item)"
              :key="eachNeed.item"
              class="flex align-start justify-between mb-[12px]"
            >
              <p class="text-small text-[#020202]">{{ eachNeed.item }}</p>
              <p v-if="eachNeed.quantidade > 0" class="text-small ml-2 text-[#020202] pr-1">{{ eachNeed.quantidade }}</p>
            </li>
          </ul>

          <div v-if="abrigo.itensUteis.length >= 4" class="absolute bottom-0 left-0 w-full h-[40px]"/>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-5 border-t border-[#F1F1F1] pt-4 relative" >
      <div
        class="absolute bg-gradient-to-t from-white to-white/30 w-full h-[40px] left-0"
        :class="{
          'h-[20px]': isCityCentralizedDonations,
          'top-[-45px]': isCityCentralizedDonations,
          'top-[-60px]': !isCityCentralizedDonations,
        }"
      />

      <button @click="handleLinkToWhatsapp" v-if="hasPhoneNumber" class="flex w-full h-[40px] rounded-xl bg-[#02952B] relative align-center justify-center hover:opacity-90">
        <Icon icon="mingcute:whatsapp-fill" height="20px" class="absolute left-4" color="#FFF"/>
        <p class="font-semibold text-white">Whatsapp</p>
      </button>

      <div :class="`flex gap-3 ${hasPhoneNumber ? 'mt-4' : ''}`">
        <button @click="handleLinkToMaps" class="relative flex-1 bg-[#E3EDFD] rounded-xl h-[40px] align-center justify-center hover:opacity-90">
          <Icon icon="tabler:location-filled" height="20px" class="absolute left-4 top-[calc(50%-10px)]" color="#114DE6"/>
          <p class="font-semibold text-[#114DE6]">Direções</p>
        </button>

        <button @click="handleCallToPhone" v-if="hasPhoneNumber" class="relative flex-1 bg-[#E3EDFD] rounded-xl h-[40px] align-center justify-center hover:opacity-90">
          <Icon icon="carbon:phone-filled" height="20px" class="absolute left-4 top-[calc(50%-10px)]" color="#114DE6"/>
          <p class="font-semibold text-[#114DE6]">Ligar</p>
        </button>
      </div>
    </div>
  </div>

  <div v-if="isMobile" @click="handleClose" class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-20" />
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import type { Abrigo } from '~/models/Abrigo';
  import { useDayjs } from '#imports';
  import { citiesWithCentralizedDonations } from '~/config/citiesWithCentralizedDonations';

  const dayjs = useDayjs()

  const props = defineProps<{ abrigo: Abrigo | null }>();
  const emit = defineEmits(['onClose'])

  const abrigo = toRef(props, 'abrigo')

  const hasPhoneNumber = !!abrigo.value?.telefone
  const formattedLastUpdated = dayjs(abrigo.value?.update_in?._nanoseconds).format('DD/MM - HH:mm')

  const shouldShowLastUpdatedTag = computed(() => {
    const isNotUpdatedYet = abrigo.value?.update_in?._nanoseconds === abrigo.value?.create_in?._nanoseconds
    return !!abrigo.value?.update_in?._nanoseconds && !isNotUpdatedYet
  })

  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  const isCityCentralizedDonations = computed(() => citiesWithCentralizedDonations.includes(abrigo.value?.city ?? ''));
  const isManagedByGovern = computed(() => abrigo.value?.abrigopm && abrigo.value.pmpa === abrigo.value.city);

  const sanitizedPhone = String(abrigo.value?.telefone)?.replace(/\D/g, '');

  const occupationPercentage = computed(() => {
    if (abrigo.value?.vagas === '0' || abrigo.value?.vagas === null || abrigo.value?.vagas === 0) return '100'

    const totalSlots = Number(abrigo.value?.vagas || '0')
    const occupiedSlots = parseInt(abrigo.value?.vagas_ocupadas || '0')
    const percentage = (occupiedSlots / totalSlots) * 100
    return percentage > 0 ? Math.min(percentage, 100).toFixed(0) : '0'
  })

  const availableSlots = computed(() => {
    const totalSlots = Number(abrigo.value?.vagas || '0')
    const occupiedSlots = parseInt(abrigo.value?.vagas_ocupadas || '0')
    return Math.max(totalSlots - occupiedSlots, 0);
  })

  const occupationColor = computed(() => {
    const percentage = parseFloat(occupationPercentage.value)

    if (percentage < 50) {
      return {
      background: 'bg-[#E3FBEA]',
      bullet: 'bg-[#02952B]',
      text: 'text-[#02952B]'
      }
    }

    if (percentage < 75) {
      return {
        background: 'bg-[#FFF5EC]',
        bullet: 'bg-[#E37000]',
        text: 'text-[#E37000]'
      }
    }

    return {
      background: 'bg-[#FDDDE0]',
      bullet: 'bg-[#E61226]',
      text: 'text-[#E61226]'
    }
  })

  const handleLinkToWhatsapp = () => {
    if (!abrigo.value?.telefone) return
    window.open(`https://api.whatsapp.com/send?phone=${sanitizedPhone}`)
  }

  const handleCallToPhone = () => {
    if (!abrigo.value?.telefone) return
    window.open(`tel:${sanitizedPhone}`)
  }

  const handleLinkToMaps = () => {
    if (!abrigo.value?.latitude || !abrigo.value?.longitude) return
    window.open(`https://www.google.com/maps/search/?api=1&query=${abrigo.value?.latitude},${abrigo.value?.longitude}`)
  }

  const handleClose = () => {
    emit('onClose')
  }
</script>
