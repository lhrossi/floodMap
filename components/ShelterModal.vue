<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useDayjs } from '#imports';
import { citiesWithCentralizedDonations } from '~/config/citiesWithCentralizedDonations';
import type { Abrigo } from '~/models/Abrigo';
import OccupationUtils from '~/utils/occupationUtils';

const props = defineProps<{ abrigo: Abrigo | null }>();

const emit = defineEmits([
  'onClose',
]);

const dayjs = useDayjs();

const scrollRef = ref<HTMLDivElement | null>(null);

const abrigo = toRef(props, 'abrigo');

const hasPhoneNumber = computed(() => !!abrigo.value?.telefone);
const formattedLastUpdated = computed(() => dayjs(abrigo.value?.update_in?._seconds ?? 0 * 1000).format('DD/MM - HH:mm'));

const shouldShowLastUpdatedTag = computed(() => {
  return !!abrigo.value?.update_in?._seconds;
});

const userAgent = navigator.userAgent;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

const isCityCentralizedDonations = computed(() => citiesWithCentralizedDonations.includes(abrigo.value?.city ?? ''));
const isManagedByGovern = computed(() => abrigo.value?.abrigopm && abrigo.value.pmpa === abrigo.value.city);

const sanitizedPhone = computed(() => String(abrigo.value?.telefone)?.replace(/\D/g, ''));

const occupationUtils = computed(() => new OccupationUtils(abrigo.value));

const occupationsList = computed(() => occupationUtils.value.occupations);

const occupationsUISpecifications = computed(() => {
  return {
    textContainer: occupationsList.value.length > 1 ? 'flex-col' : 'flex-row',
    textSize: occupationsList.value.length > 1 ? 'text-[11px]' : 'text-sm',
    showBullet: occupationsList.value.length === 1,
  };
});

function handleLinkToWhatsapp() {
  if (!abrigo.value?.telefone) return;
  window.open(`https://api.whatsapp.com/send?phone=${sanitizedPhone.value}`);
}

function handleCallToPhone() {
  if (!abrigo.value?.telefone) return;
  window.open(`tel:${sanitizedPhone.value}`);
}

function handleLinkToMaps() {
  if (!abrigo.value?.latitude || !abrigo.value?.longitude) return;
  window.open(`https://www.google.com/maps/search/?api=1&query=${abrigo.value?.latitude},${abrigo.value?.longitude}`);
}

function handleClose() {
  emit('onClose');
}

watch(abrigo, () => {
  if (scrollRef.value) {
    scrollRef.value.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }
});
</script>

<template>
  <div
    class="
    flex flex-column
    mobile:left-0 mobile:w-full mobile:max-h-[80vh] mobile:bottom-0 mobile:transform mobile:animate-appear-from-bottom
    laptop:left-[24px] laptop:bottom-[40px] laptop:w-[375px]
    bg-white pt-5 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] laptop:rounded-[32px] mobile:rounded-t-[32px]
    absolute bottom-[40px] pb-[40px] z-50"
  >
    <!-- Header -->
    <div
      class="flex align-center mb-3 px-5"
      :class="shouldShowLastUpdatedTag ? 'justify-between' : 'justify-end'"
    >
      <div
        v-if="shouldShowLastUpdatedTag"
        class="bg-[#F1F1F1] px-3 py-2 align-center justify-center rounded-xl flex"
      >
        <Icon
          icon="flowbite:refresh-outline"
          height="12px"
          color="#3E3E3E"
        />

        <p class="text-[#3E3E3E] text-sm ml-2">
          {{ `Atualizado ${formattedLastUpdated}` }}
        </p>
      </div>

      <!-- CloseButton -->
      <button
        class="flex w-[24px] h-[24px] rounded-full align-center justify-center cursor-pointer bg-[#E0E0E0] hover:opacity-90"
        @click="handleClose"
      >
        <Icon
          icon="material-symbols:close"
          height="16px"
          color="#3E3E3E"
        />
      </button>
    </div>

    <div
      ref="scrollRef"
      class="flex-1 overflow-auto relative pt-3 pb-[20px] px-5"
    >
      <!-- Content Table -->
      <div>
        <h2 class="text-xl font-bold">
          {{ abrigo?.nome }}
        </h2>

        <div class="mt-5">
          <div
            v-if="!!abrigo?.address"
            class="flex align-center mb-[16px]"
          >
            <Icon
              icon="majesticons:map-marker"
              color="#3E3E3E"
              class="min-w-[24px]"
            />

            <p class="ml-[6px] text-[#3E3E3E]">
              {{ abrigo?.address }}
            </p>
          </div>

          <div
            v-if="hasPhoneNumber"
            class="flex align-start mb-[16px]"
          >
            <Icon
              icon="carbon:phone-filled"
              class="min-w-[24px]"
              color="#3E3E3E"
            />

            <p class="ml-[6px] text-[#3E3E3E]">
              {{ `${abrigo?.telefone} ${abrigo?.nome_contato ? `/ ${abrigo?.nome_contato}` : ''}` }}
            </p>
          </div>

          <div
            v-if="!!abrigo?.vagas_pet"
            class="flex align-start"
          >
            <Icon
              icon="material-symbols:pets"
              class="min-w-[24px]"
              color="#3E3E3E"
            />

            <p class="ml-[6px] text-[#3E3E3E]">
              Aceita animais
            </p>
          </div>
        </div>
      </div>

      <!-- Available Slots Card -->
      <div
        v-if="occupationsList.length"
        class="flex flex-row gap-4 mt-5"
      >
        <div
          v-for="occupation in occupationsList"
          :key="occupation.type"
          class="flex flex-1 flex-column rounded-[16px] overflow-hidden h-[80px]"
        >
          <div class="flex flex-1 bg-[#F1F1F1] align-center justify-center h-[40px]">
            <Icon
              :icon="occupation.icon"
              class="min-h-[20px]"
              color="#3E3E3E"
            />

            <p class="ml-2 text-[#3E3E3E] font-semibold">
              {{ occupation.label }}
            </p>
          </div>

          <div
            :class="`flex flex-1 align-center justify-center ${occupationsUISpecifications.textContainer}`"
            :style="{ backgroundColor: occupation.colors.background }"
          >
            <p
              :class="`font-semibold ${occupationsUISpecifications.textSize}`"
              :style="{ color: occupation.colors.text }"
            >
              {{ `${occupation.occupiedPercentage.replace('.', ',')}% ocupado` }}
            </p>

            <div
              v-if="occupationsUISpecifications.showBullet"
              class="w-1 h-1 rounded-full mx-2"
              :style="{ backgroundColor: occupation.colors.text }"
            />

            <div class="flex align-center">
              <p
                :class="`font-semibold ${occupationsUISpecifications.textSize}`"
                :style="{ color: occupation.colors.text }"
              >
                {{ `${occupation.availableSlots} Vagas Livres` }}
              </p>

              <p :class="`text-[#3E3E3E] font-semibold ${occupationsUISpecifications.textSize} ml-1`">
                {{ `de ${occupation.totalSlots}` }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- List of needs -->
      <div
        v-if="!!abrigo?.itensUteis?.length || isCityCentralizedDonations"
        class="mt-5 relative"
        :class="{ 'pb-[10px]': isCityCentralizedDonations }"
      >
        <h3 class="text-lg text-[#020202] font-bold mb-4">
          Necessidades
        </h3>

        <div v-if="isCityCentralizedDonations">
          <p v-if="isManagedByGovern">
            Para doações aos abrigos gerenciados pela prefeitura, por favor, saiba os locais de doação acessando
            <a
              href="https://prefeitura.poa.br/"
              target="_blank"
            >https://prefeitura.poa.br/</a>
          </p>

          <p v-else>
            Para doações para esse abrigo, por favor, verifique as
            <a
              href="https://sos-rs.com/"
              target="_blank"
            >informações nesse link.</a>
          </p>
        </div>

        <div v-else-if="!!abrigo?.itensUteis?.length">
          <ul class="w-full">
            <li
              v-for="eachNeed in abrigo.itensUteis.filter((eachItem) => eachItem.item)"
              :key="eachNeed.item"
              class="flex align-start justify-between mb-[12px]"
            >
              <p class="text-small text-[#020202]">
                {{ eachNeed.item }}
              </p>

              <p
                v-if="eachNeed.quantidade > 0"
                class="text-small ml-2 text-[#020202] pr-1"
              >
                {{ eachNeed.quantidade }}
              </p>
            </li>
          </ul>

          <div
            v-if="abrigo.itensUteis.length >= 4"
            class="absolute bottom-0 left-0 w-full h-[40px]"
          />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-5 border-t border-[#F1F1F1] pt-4 px-5 relative">
      <div
        v-if="!!abrigo?.itensUteis?.length || isCityCentralizedDonations"
        class="absolute bg-gradient-to-t from-white to-white/30 w-full h-[40px] left-0"
        :class="{
          'h-[20px]': isCityCentralizedDonations,
          'top-[-45px]': isCityCentralizedDonations,
          'top-[-60px]': !isCityCentralizedDonations,
        }"
      />

      <button
        v-if="hasPhoneNumber"
        class="flex w-full h-[40px] rounded-xl bg-[#02952B] relative align-center justify-center hover:opacity-90"
        @click="handleLinkToWhatsapp"
      >
        <Icon
          icon="mingcute:whatsapp-fill"
          height="20px"
          class="absolute left-4"
          color="#FFF"
        />

        <p class="font-semibold text-white">
          Whatsapp
        </p>
      </button>

      <div :class="`flex gap-3 ${hasPhoneNumber ? 'mt-4' : ''}`">
        <button
          class="relative flex-1 bg-[#E3EDFD] rounded-xl h-[40px] align-center justify-center hover:opacity-90"
          @click="handleLinkToMaps"
        >
          <Icon
            icon="tabler:location-filled"
            height="20px"
            class="absolute left-4 top-[calc(50%-10px)]"
            color="#114DE6"
          />

          <p class="font-semibold text-[#114DE6]">
            Direções
          </p>
        </button>

        <button
          v-if="hasPhoneNumber"
          class="relative flex-1 bg-[#E3EDFD] rounded-xl h-[40px] align-center justify-center hover:opacity-90"
          @click="handleCallToPhone"
        >
          <Icon
            icon="carbon:phone-filled"
            height="20px"
            class="absolute left-4 top-[calc(50%-10px)]"
            color="#114DE6"
          />

          <p class="font-semibold text-[#114DE6]">
            Ligar
          </p>
        </button>
      </div>
    </div>
  </div>

  <div
    v-if="isMobile"
    class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-[40]"
    @click="handleClose"
  />
</template>
