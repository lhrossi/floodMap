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
    <button
      ref="marker"
      class="w-7 h-10 relative text-4xl overflow-hidden"
      :style="{ color: calcularCor(abrigo.vagas, abrigo.vagas_ocupadas) }"
      @click="popup"
    >
      <div class="size-4 absolute top-2 left-1/2 -translate-x-1/2 bg-white" />

      <ion-location-sharp class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
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
        class="w-6 h-6 flex items-center justify-center absolute top-0 right-0 rounded-full text-base text-neutral-500 hover:bg-neutral-100"
        @click="close"
      >
        ×
      </button>

      <ion-caret-down class="size-6 absolute top-full left-1/2 text-white -translate-y-1/3 -translate-x-1/2" />
    </div>
  </div>
</template>