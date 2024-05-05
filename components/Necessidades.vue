<template>
  <div v-if="necessidades.length > 0" class="flex flex-column gap-1">
    <v-divider class="my-2" />
    <h5 class="font-bold">Necessidades:</h5>
    <span v-for="necessidade in necessidades" :class="necessidade.class">{{
      necessidade.nome
    }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ abrigo: any }>();

const necessidades = computed(() => {
  const necessidades = [] as { nome: string; class?: string }[];

  if (props.abrigo.estrutura_pessoas)
    necessidades.push({ nome: "Voluntários" });
  if (props.abrigo.roupa_cama) necessidades.push({ nome: "Roupas de Cama" });
  if (props.abrigo.cozinha) necessidades.push({ nome: "Alimentos" });
  if (props.abrigo.banheiros)
    necessidades.push({ nome: "Produtos de Higiene" });
  if (props.abrigo.demanda)
    necessidades.push({ nome: props.abrigo.demanda, class: "text-warning" });

  return necessidades;
});
</script>
