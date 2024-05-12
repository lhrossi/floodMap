<template>
  <v-navigation-drawer temporary class="drawer-style">
    <div class="flex flex-column filtros">
      <div class="px-4 py-4 border-b flex justify-between items-center header-filter">
        <span class="text-2xl">Encontrar abrigo | Filtros</span>
        <v-btn elevation="0" rounded="xl" size="x-small" class="flex items-center justify-center" @click="() => emit('closeFilters')">&#x2715; </v-btn>
      </div>
      <span class="px-4 flex flex-col gap-1 pt-8">
        <v-select :label="'Cidades'" :items="cidades" v-model="cidade" class="w-full" />
        <v-chip
          v-for="filtro of filtrosPreDefinidos"
          v-on:click="filtro.habilitado = !filtro.habilitado"
          :variant="filtro.habilitado ? 'elevated' : 'outlined'"
          size="small"
          color="primary"
          :key="filtro.nome"
        >
          {{ filtro.nome }}:
          {{ abrigosPorCidade?.filter(filtro.filtro)?.length }}
        </v-chip>
      </span>
      <div class="px-4 flex gap-2 w-full pt-12 border-t mt-12">
        <v-btn elevation="0" rounded="xl" class="flex-1" size="large" border="#CBCBCB sm">Limpar filtro</v-btn>
        <v-btn elevation="0" rounded="xl" class="flex-1" size="large" color="primary" @click="() => emit('closeFilters')">Aplicar</v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const props = defineProps<{ abrigos: any[]; initialCity?: string }>();

const emit = defineEmits(["filterChange", "cityChange", "closeFilters"]);

const cidade = ref(props.initialCity || "Todos");

const cidades = computed(() => {
  if (!props.abrigos) return [];
  return ["Todos"].concat(
    props.abrigos
      .map((item) => item.city)
      .filter((city, index, self) => self.indexOf(city) === index)
      .filter((city) => city && city != "")
  );
});

const filtrosPreDefinidos = ref([
  {
    nome: "Com vagas",
    habilitado: false,
    filtro: (abrigo: any) => parseInt(abrigo.vagas_ocupadas) < parseInt(abrigo.vagas),
  },
  {
    nome: "Com Cozinha",
    habilitado: false,
    filtro: (abrigo: any) => abrigo.cozinha == true,
  },
  {
    nome: "Com Banheiros",
    habilitado: false,
    filtro: (abrigo: any) => abrigo.banheiros == true,
  },
  {
    nome: "Com Demanda",
    habilitado: false,
    filtro: (abrigo: any) => abrigo.demanda != null,
  },
]);

const abrigosPorCidade = computed(() => {
  if (!props.abrigos) return [];

  return props.abrigos.filter((abrigo) => cidade.value == "Todos" || abrigo.city == cidade.value) || [];
});

const filtrarDados = () => {
  if (!props.abrigos) return [];

  const filtrosHabilitados = filtrosPreDefinidos.value.filter((filtro) => filtro.habilitado);

  let abrigosFiltrados = abrigosPorCidade.value.filter((a) => filtrosHabilitados?.length == 0 || filtrosHabilitados.some((f) => f.filtro(a)));

  emit("filterChange", abrigosFiltrados);
};

function onCityChange(value: string) {
  emit("cityChange", value);
}

watch([cidade, filtrosPreDefinidos], filtrarDados, { deep: true });

watch(cidade, onCityChange);

filtrarDados();
</script>

<style lang="scss">
.v-navigation-drawer {
  top: 0 !important;
  min-height: 100dvh !important;
  z-index: 1000 !important;
  padding: 0;
}

.v-navigation-drawer--active {
  min-width: 536px;
}

@media (max-width: 768px) {
  .v-navigation-drawer--active {
    min-width: 100%;
  }
}

.v-navigation-drawer__scrim {
  opacity: 0.5 !important;
  z-index: 910 !important;
}

.drawer-style .v-field__overlay {
  background-color: #ffffff;
  border: 1.4px solid #000000;
  border-radius: 8px;
}

.drawer-style .mdi-menu-down:before {
  content: "⌄";
  position: absolute;
  height: 34px;
  color: #1351b4;
}

.drawer-style .filtros {
  padding: 0;
}

.drawer-style .header-filter .v-btn {
  width: 36px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #cbcbcb;
  font-size: 14px;
  color: #1351b4;
}
</style>
