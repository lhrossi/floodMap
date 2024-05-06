<template>
  <div class="flex gap-2">
    <v-chip v-if="abrigo.vagas" variant="flat" size="small" color="primary"
      >{{ abrigo.vagas }} VAGAS</v-chip
    >
    <v-chip
      v-if="!isNaN(vagas) && !isNaN(vagasOcupadas) && vagas > 0"
      variant="flat"
      size="small"
      :color="
        color(calcularCor(abrigo.vagas, abrigo.vagas_ocupadas))
          .desaturate(0.5)
          .darken(0.3)
          .hex()
      "
    >
      <span v-if="totalVagas === 0">LOTADO</span>
      <span v-else-if="totalVagas === 1">1 DISPONÍVEL</span>
      <span v-else>{{ totalVagas }} DISPONÍVEIS</span>
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import calcularCor from "../utils/calcularCor";
import color from "color";
import type { Abrigo } from "~/types/abrigo";

const props = defineProps<{ abrigo: Abrigo }>();

const vagas = computed(() => Number(props.abrigo.vagas));
const vagasOcupadas = computed(() => Number(props.abrigo.vagas_ocupadas));
const totalVagas = computed(() =>
  Math.max(vagas.value - vagasOcupadas.value, 0)
);
</script>
