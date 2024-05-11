<script setup lang="ts">
import calcularCor from '~/utils/calcularCor';
import { onClickOutside } from '@vueuse/core';

const props = defineProps<{
  abrigo: any;
}>();

const emit = defineEmits(['open', 'close']);

const marker = ref<HTMLButtonElement | null>(null);
const tooltip = ref<HTMLDivElement | null>(null);
const open = ref<boolean>(false);

function popup() {
  open.value = !open.value;
}

function index(value: boolean) {
  useMapboxMarker(`marker-${props.abrigo.id}`, (marker) => {
    if (value) {
      marker._element.classList.add('z-10');
    } else {
      marker._element.classList.remove('z-10');
    }
  });
}

function close() {
  open.value = false;
}

watch(open, index);

onClickOutside(tooltip, close, {
  ignore: [marker],
});
</script>

<template>
  <div class="relative">
    <button ref="marker" @click="popup">
      <svg display="block" height="41px" width="27px" viewBox="0 0 27 41"><path :fill="calcularCor(abrigo.vagas, abrigo.vagas_ocupadas)" d="M27,13.5C27,19.07 20.25,27 14.75,34.5C14.02,35.5 12.98,35.5 12.25,34.5C6.75,27 0,19.22 0,13.5C0,6.04 6.04,0 13.5,0C20.96,0 27,6.04 27,13.5Z"></path><path opacity="0.25" d="M13.5,0C6.04,0 0,6.04 0,13.5C0,19.22 6.75,27 12.25,34.5C13,35.52 14.02,35.5 14.75,34.5C20.25,27 27,19.07 27,13.5C27,6.04 20.96,0 13.5,0ZM13.5,1C20.42,1 26,6.58 26,13.5C26,15.9 24.5,19.18 22.22,22.74C19.95,26.3 16.71,30.14 13.94,33.91C13.74,34.18 13.61,34.32 13.5,34.44C13.39,34.32 13.26,34.18 13.06,33.91C10.28,30.13 7.41,26.31 5.02,22.77C2.62,19.23 1,15.95 1,13.5C1,6.58 6.58,1 13.5,1Z"></path><circle fill="white" cx="13.5" cy="13.5" r="5.5"></circle></svg>
    </button>

    <div
      v-if="open"
      ref="tooltip"
      class="w-[250px] max-w-screen p-3 absolute bottom-full left-1/2 bg-white rounded shadow -translate-y-3 -translate-x-1/2"
    >
      <h3 v-if="abrigo.nome">{{ abrigo.nome }}</h3>

      <p v-if="abrigo.address">{{ abrigo.address }}</p>

      <p v-if="abrigo.nome_contato || abrigo.telefone">
        {{ abrigo.nome_contato }}
        <span v-show="abrigo.telefone">- {{ abrigo.telefone }}</span>
      </p>

      <v-divider class="my-2" />

      <ContagemVagas :abrigo="abrigo" />

      <Necessidades :abrigo="abrigo" />

      <ComoChegar :abrigo="abrigo" />

      <button
        class="w-6 h-6 flex items-center justify-center absolute top-0 right-0 text-base text-neutral-400"
        @click="close"
      >
        ×
      </button>
    </div>
  </div>
</template>