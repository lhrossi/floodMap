<template>
  <div v-if="abrigo.itensUteis?.length > 0" class="flex flex-column gap-1">
    <v-divider class="my-2" />
    <h5 class="font-bold">Necessidades:</h5>
    <ul>
      <li
        v-if="abrigo.itensUteis"
        v-for="necessidade in abrigo.itensUteis" 
        class="flex justify-between"
        :key="necessidade.nome">
        <span>
          {{ necessidade.item }}
        </span>
        <span class="font-semibold">
          {{necessidade.quantidade}}
        </span>
      </li>
  </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ abrigo: any }>();


// VERSÂO ANTIGA Caso precise
// const necessidades = computed(() => {
//   const necessidades = [] as { nome: string; class?: string }[];

//   if (props.abrigo.estrutura_pessoas) necessidades.push({ nome: "Voluntários" });
//   if (props.abrigo.roupa_cama) necessidades.push({ nome: "Roupas de Cama" });
//   if (props.abrigo.cozinha) necessidades.push({ nome: "Alimentos" });
//   if (props.abrigo.banheiros) necessidades.push({ nome: "Produtos de Higiene" });
//   if (props.abrigo.demanda) necessidades.push({ nome: props.abrigo.demanda, class: "text-warning" });

//   return necessidades;
// });
</script>
