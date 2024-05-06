<template>
  <div
    v-if="necessidades.length > 0"
    class="flex flex-column gap-1 border py-2 px-4 rounded bg-blue-100"
  >
    <h5 class="font-bold text-base">Necessidades:</h5>

    <ul>
      <li
        v-for="necessidade in necessidades"
        :class="`${necessidade.class} text-base flex items-baseline gap-2 capitalize`"
      >
        <span class="relative -top-0.5">
          <v-icon icon="mdi-alert" size="16" v-if="necessidade.important" />
          <v-icon icon="mdi-circle-box" size="16" v-else />
        </span>
        <span>{{ necessidade.nome }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Abrigo } from "~/types/abrigo";

const props = defineProps<{ abrigo: Abrigo }>();

const necessidades = computed(() => {
  const necessidades = [] as {
    nome: string;
    class?: string;
    important?: boolean;
  }[];

  if (props.abrigo.demanda) {
    necessidades.push({
      nome: props.abrigo.demanda,
      class: "text-warning font-bold",
      important: true,
    });
  }

  if (props.abrigo.estrutura_pessoas) {
    necessidades.push({ nome: "Voluntários" });
  }

  if (props.abrigo.roupa_cama) {
    necessidades.push({ nome: "Roupas de Cama" });
  }

  if (props.abrigo.cozinha) {
    necessidades.push({ nome: "Alimentos" });
  }

  if (props.abrigo.banheiros) {
    necessidades.push({ nome: "Produtos de Higiene" });
  }

  return necessidades;
});
</script>
