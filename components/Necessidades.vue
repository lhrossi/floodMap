<template>
  <div v-if="isCityCentralizedDonations || abrigo.itensUteis?.length > 0" class="flex flex-column">
    <v-divider class="my-2" />
    <h5 class="font-bold">Necessidades:</h5>
    <div v-if="isCityCentralizedDonations">
      <p v-if="isManagedByGovern">
        Para doações aos abrigos gerenciados pela prefeitura, por favor, saiba os locais de doação acessando
        <a href="https://prefeitura.poa.br/" target="_blank">https://prefeitura.poa.br/</a>
      </p>
      <p v-else>
        Para doações para esse abrigo, por favor, verifique as
        <a href="http://bit.ly/4ae0oCi%E2%80%9D" target="_blank">informações nesse link.</a>
      </p>
    </div>
    <ul v-else class="necessidades-list overflow-auto max-h-40" tabindex="1">
      <li v-if="necessidades.length" v-for="necessidade in necessidades" class="flex justify-between"
        :key="necessidade.item">
        <span>
          {{ necessidade.item }}
        </span>
        <span v-if="necessidade.quantidade" class="font-semibold">
          {{ necessidade.quantidade }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { citiesWithCentralizedDonations } from '~/config/citiesWithCentralizedDonations';

const { abrigo } = defineProps<{ abrigo: any }>();

const isCityCentralizedDonations = computed(() => citiesWithCentralizedDonations.includes(abrigo.city));

const isManagedByGovern = computed(() => abrigo.abrigopm && abrigo.pmpa === abrigo.city);

const necessidades = computed(() => abrigo.itensUteis.filter((item: any) => item.item));

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

<style lang="scss" scoped>
h5 {
  margin-top: 8px;
  margin-bottom: 10px;
  font-size: 16px;
}

.necessidades-list {
  padding-right: 10px;

  li:not(:last-of-type) {
    margin-bottom: 6px;
  }
}

.necessidades-list::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 3px;
  background-color: #D9D9D9;
  border-radius: 4px;
}

.necessidades-list::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .5);
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}

a {
  text-decoration: underline;
}
</style>
