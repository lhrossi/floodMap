<template>
  <v-container>
    <v-container>
      <v-snackbar v-model="error" multi-line>
        Falha ao carregar abrigos
      </v-snackbar>

      <div
        class="fixed right-4 top-20 z-50 bg-white p-4 rounded border shadow-lg flex flex-col gap-2"
      >
        <div v-if="lastUpdate">
          Última Atualização: <b>{{ formatDate(lastUpdate) }}</b>
        </div>
        <div>
          Total de vagas: <b>{{ totalVagas }}</b>
        </div>
        <div>
          Vagas ocupadas:
          <b
            >{{ totalVagasOcupadas }}

            <span
              class="font-bold text-center"
              :style="{ color: calcularCor(totalVagas, totalVagasOcupadas) }"
            >
              ({{ Math.round((totalVagasOcupadas * 100) / totalVagas) }}%)
            </span>
          </b>
        </div>

        <v-btn color="primary" class="mt-4" v-on:click="filterDrawer = true">
          Filtrar abrigos
        </v-btn>
      </div>
      <v-navigation-drawer v-model="filterDrawer" temporary>
        <div class="flex flex-column p-4 gap-2">
          <span>Filtrar abrigos</span>
          <v-chip
            v-for="filter of filters"
            v-on:click="filter.enabled = !filter.enabled"
            :variant="filter.enabled ? 'elevated' : 'outlined'"
            size="small"
            color="primary"
          >
            {{ filter.name }}:
            {{ abrigos?.filter(filter.filterFunction).length }}
          </v-chip>
          <v-btn size="small" v-on:click="filterDrawer = false"> Fechar </v-btn>
        </div>
      </v-navigation-drawer>
      <v-row class="mt-4">
        <v-col>
          <Map :abrigos="filteredItems" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import type { Abrigo } from "~/types/abrigo";
import calcularCor from "../utils/calcularCor";
import type { Filter } from "~/types/filter";

const lastUpdate = ref();
const filterDrawer = ref(false);

const {
  data: abrigos,
  error,
  refresh,
} = await useFetch<Abrigo[]>("/api/abrigos");

useIntervalFn(() => {
  refresh();
  lastUpdate.value = new Date();
}, 5000);

const filters = ref<Filter[]>([
  {
    name: "Com vagas",
    enabled: false,
    filterFunction: (item) =>
      parseInt(item.vagas_ocupadas) < parseInt(item.vagas),
  },
  {
    name: "Com Cozinha",
    enabled: false,
    filterFunction: (item) => item.cozinha == true,
  },
  {
    name: "Com Banheiros",
    enabled: false,
    filterFunction: (item) => !!item.banheiros && item.banheiros > 0,
  },
  {
    name: "Com Demanda",
    enabled: false,
    filterFunction: (item) => item.demanda != null,
  },
]);

const filteredItems = computed(() => {
  if (!abrigos.value) {
    return [];
  }
  const enabledFilters = filters.value.filter((f) => f.enabled);
  if (enabledFilters.length === 0) {
    return abrigos.value;
  }
  return abrigos.value.filter((item) =>
    enabledFilters.every((filter) => filter.filterFunction(item))
  );
});

const totalVagas = computed(() => {
  if (!abrigos.value) {
    return 0;
  }
  return abrigos.value.reduce((acc, item) => {
    const value = parseInt(item.vagas);
    if (isNaN(value)) {
      return acc;
    }
    return acc + value;
  }, 0);
});

const totalVagasOcupadas = computed(() => {
  if (!abrigos.value) {
    return 0;
  }
  return abrigos.value.reduce((acc, item) => {
    const value = parseInt(item.vagas_ocupadas);
    if (isNaN(value)) {
      return acc;
    }
    return acc + value;
  }, 0);
});

useHead({
  titleTemplate: () => "Localização dos abrigos",
});
</script>
