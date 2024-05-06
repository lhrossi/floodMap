<template>
  <div class="flex space-x-2">
    <v-chip v-if="abrigo.vagas" variant="flat" size="small" color="primary">{{ abrigo.vagas }} vagas</v-chip>
    <v-chip
      v-if="!isNaN(abrigo.vagas) && !isNaN(abrigo.vagas_ocupadas) && abrigo.vagas > 0"
      variant="flat"
      size="small"
      :color="calcularCor(abrigo.vagas, abrigo.vagas_ocupadas)"
      >{{ Math.max(abrigo.vagas - abrigo.vagas_ocupadas, 0) }} livres</v-chip
    >
  </div>
</template>

<script setup lang="ts">
import calcularCor from "../utils/calcularCor";
defineProps<{ abrigo: any }>();
</script>
