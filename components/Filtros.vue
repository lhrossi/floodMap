<template>
  <v-navigation-drawer temporary>
    <div class="flex flex-column filtros">
      <span>Filtrar abrigos</span>
      <v-select :label="'Cidades'" :items="cidades" v-model="cidade" />
      <v-chip
        v-for="filtro of filtrosPreDefinidos"
        v-on:click="filtro.habilitado = !filtro.habilitado"
        :variant="filtro.habilitado ? 'elevated' : 'outlined'"
        size="small"
        color="primary"
        :key="filtro.nome"
      >
        {{ filtro.nome }}: {{ abrigosPorCidade?.filter(filtro.filtro).length }}
      </v-chip>
      <v-btn size="small">Fechar</v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const props = defineProps<{ abrigos: any[] }>();
const emit = defineEmits(["filterChange"]);

const cidade = ref("Todos");

const cidades = computed(() => {
  if (!props.abrigos) return [];
  return ["Todos"].concat(
    props.abrigos
      .map((item) => item.city)
      .filter((city, index, self) => self.indexOf(city) === index)
      .filter((city) => city && city != "")
  )
})

const filtrosPreDefinidos = ref([
  { nome: "Com vagas", habilitado: false, filtro: (abrigo: any) => parseInt(abrigo.vagas_ocupadas) < parseInt(abrigo.vagas) },
  { nome: "Com Cozinha", habilitado: false, filtro: (abrigo: any) => abrigo.cozinha == true },
  { nome: "Com Banheiros", habilitado: false, filtro: (abrigo: any) => abrigo.banheiros == true },
  { nome: "Com Demanda", habilitado: false, filtro: (abrigo: any) => abrigo.demanda != null },
]);

const abrigosPorCidade = computed(() => {
  if (!props.abrigos) return [];

  return props.abrigos.filter((abrigo) => cidade.value == "Todos" || abrigo.city == cidade.value);
});

const filtrarDados = () => {
  if (!props.abrigos) return [];

  const filtrosHabilitados = filtrosPreDefinidos.value.filter((filtro) => filtro.habilitado);

  let abrigosFiltrados = abrigosPorCidade.value.filter((a) => filtrosHabilitados.length == 0 || filtrosHabilitados.some((f) => f.filtro(a)));

  emit("filterChange", abrigosFiltrados);
};

watch([cidade, filtrosPreDefinidos], filtrarDados, { deep: true });
</script>
