<script setup lang="ts">
import { unionBy } from 'lodash-es';
import FilterUtils from '~/utils/filters';
import necessitiesMap from '~/public/necessities-map.json';

import type { Abrigo, NecessidadeItem } from '~/models/Abrigo';

const props = defineProps<{ abrigos: Abrigo[]; currentCity?: string }>();

const emit = defineEmits([
  'filterChange',
  'closeFilters',
]);

const necessitiesList: Record<string, string[]> = necessitiesMap;

const formatNecessidade = (necessidade: string) => FilterUtils.slugifyNeed(necessidade);

const necessidadesFromAbrigos = computed<NecessidadeItem[]>(() => (
  props.abrigos
    .filter((abrigo) => abrigo.itensUteis?.length)
    .reduce<NecessidadeItem[]>((necessidades, item) => {
      if (!item.itensUteis?.length)
        return necessidades;

      const items = item.itensUteis
        .reduce<NecessidadeItem[]>((items, necessity) => {
          const value = Object.keys(necessitiesList).find((key) => necessitiesList[key].includes(necessity.item));

          if (!value) return items;

          const exists = items.find(({ label }) => label === value);

          if (!exists) {
            items.push({
              label: value,
              values: necessitiesList[value],
            });
          }

          return items;
        }, []);

      return unionBy(necessidades, items, 'label');
    }, [])
));

const filtrosPreDefinidos = ref([
  {
    title: 'Tipo',
    icon: `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.00002 10.5C8.85169 10.5 8.70668 10.544 8.58334 10.6264C8.46001 10.7088 8.36388 10.8259 8.30711 10.963C8.25035 11.1 8.23549 11.2508 8.26443 11.3963C8.29337 11.5418 8.3648 11.6754 8.46969 11.7803C8.57458 11.8852 8.70822 11.9566 8.8537 11.9856C8.99919 12.0145 9.14999 11.9997 9.28703 11.9429C9.42408 11.8861 9.54121 11.79 9.62362 11.6667C9.70604 11.5433 9.75002 11.3983 9.75002 11.25C9.75002 11.0511 9.671 10.8603 9.53035 10.7197C9.3897 10.579 9.19893 10.5 9.00002 10.5ZM9.00002 1.5C8.01511 1.5 7.03984 1.69399 6.1299 2.0709C5.21995 2.44781 4.39316 3.00026 3.69672 3.6967C2.2902 5.10322 1.50002 7.01088 1.50002 9C1.49346 10.7319 2.09312 12.4114 3.19502 13.7475L1.69502 15.2475C1.59095 15.353 1.52046 15.4869 1.49243 15.6324C1.4644 15.7779 1.48009 15.9284 1.53752 16.065C1.59981 16.1999 1.7008 16.3133 1.82766 16.3908C1.95451 16.4682 2.10152 16.5063 2.25002 16.5H9.00002C10.9891 16.5 12.8968 15.7098 14.3033 14.3033C15.7098 12.8968 16.5 10.9891 16.5 9C16.5 7.01088 15.7098 5.10322 14.3033 3.6967C12.8968 2.29018 10.9891 1.5 9.00002 1.5ZM9.00002 15H4.05752L4.75502 14.3025C4.82589 14.233 4.88227 14.1502 4.92089 14.0588C4.95951 13.9674 4.97961 13.8692 4.98002 13.77C4.9772 13.5722 4.89633 13.3835 4.75502 13.245C3.77296 12.264 3.1614 10.9729 3.02454 9.59159C2.88768 8.21029 3.23398 6.82425 4.00444 5.66964C4.77491 4.51503 5.92186 3.66327 7.24991 3.25948C8.57795 2.85569 10.0049 2.92485 11.2877 3.45519C12.5705 3.98552 13.6297 4.94421 14.2849 6.16792C14.94 7.39163 15.1507 8.80466 14.8809 10.1663C14.6111 11.5279 13.8775 12.7538 12.8052 13.6352C11.7328 14.5166 10.3881 14.9989 9.00002 15ZM9.00002 6C8.80111 6 8.61034 6.07902 8.46969 6.21967C8.32904 6.36032 8.25002 6.55109 8.25002 6.75V9C8.25002 9.19891 8.32904 9.38968 8.46969 9.53033C8.61034 9.67098 8.80111 9.75 9.00002 9.75C9.19893 9.75 9.3897 9.67098 9.53035 9.53033C9.671 9.38968 9.75002 9.19891 9.75002 9V6.75C9.75002 6.55109 9.671 6.36032 9.53035 6.21967C9.3897 6.07902 9.19893 6 9.00002 6Z" fill="#A9A9A9"/>
      </svg>
    `,
    filtros: [
      {
        name: 'Com vagas para pessoas',
        active: false,
        filter: (abrigo: Abrigo) => !!abrigo.vagas,
        showCounter: true,
      },
      {
        name: 'Com vagas para pets',
        active: false,
        filter: (abrigo: Abrigo) => !!abrigo.vagas_pet && Number.parseInt(abrigo.vagas_pet as string) > 0,
        showCounter: true,
      },
    ],
  },
  {
    title: 'Necessidades',
    icon: `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.25 5.25098H12V4.50098C12 3.70533 11.6839 2.94227 11.1213 2.37966C10.5587 1.81705 9.79565 1.50098 9 1.50098C8.20435 1.50098 7.44129 1.81705 6.87868 2.37966C6.31607 2.94227 6 3.70533 6 4.50098V5.25098H3.75C3.55109 5.25098 3.36032 5.32999 3.21967 5.47065C3.07902 5.6113 3 5.80206 3 6.00098V14.251C3 14.8477 3.23705 15.42 3.65901 15.842C4.08097 16.2639 4.65326 16.501 5.25 16.501H12.75C13.3467 16.501 13.919 16.2639 14.341 15.842C14.7629 15.42 15 14.8477 15 14.251V6.00098C15 5.80206 14.921 5.6113 14.7803 5.47065C14.6397 5.32999 14.4489 5.25098 14.25 5.25098ZM7.5 4.50098C7.5 4.10315 7.65804 3.72162 7.93934 3.44032C8.22064 3.15901 8.60218 3.00098 9 3.00098C9.39782 3.00098 9.77936 3.15901 10.0607 3.44032C10.342 3.72162 10.5 4.10315 10.5 4.50098V5.25098H7.5V4.50098ZM13.5 14.251C13.5 14.4499 13.421 14.6407 13.2803 14.7813C13.1397 14.922 12.9489 15.001 12.75 15.001H5.25C5.05109 15.001 4.86032 14.922 4.71967 14.7813C4.57902 14.6407 4.5 14.4499 4.5 14.251V6.75098H6V7.50098C6 7.69989 6.07902 7.89065 6.21967 8.03131C6.36032 8.17196 6.55109 8.25098 6.75 8.25098C6.94891 8.25098 7.13968 8.17196 7.28033 8.03131C7.42098 7.89065 7.5 7.69989 7.5 7.50098V6.75098H10.5V7.50098C10.5 7.69989 10.579 7.89065 10.7197 8.03131C10.8603 8.17196 11.0511 8.25098 11.25 8.25098C11.4489 8.25098 11.6397 8.17196 11.7803 8.03131C11.921 7.89065 12 7.69989 12 7.50098V6.75098H13.5V14.251Z" fill="#A9A9A9"/>
      </svg>
    `,
    filtros: necessidadesFromAbrigos.value
      .map((necessidade) => ({
        name: necessidade.label,
        active: false,
        showCounter: false,
        filter: (abrigo: Abrigo) => filterNecessities(abrigo, necessidade),
      }))
      .sort((a, b) => a.name ? a.name.localeCompare(b.name || '') : -1),
  },
]);

const abrigosPorCidade = computed(() => {
  if (!props.abrigos) return [];

  if (props.currentCity === 'Todos') return props.abrigos;

  return props.abrigos.filter((abrigo) => abrigo.city === props.currentCity);
});

function limparFiltros() {
  filtrosPreDefinidos.value = filtrosPreDefinidos.value.map((option) => ({
    ...option,
    filtros: option.filtros.map((filtro) => ({
      ...filtro,
      active: false,
    })),
  })) as any;
}

function filtrarDados() {
  if (!props.abrigos || !abrigosPorCidade.value.length) return [];

  const filtrosHabilitados = filtrosPreDefinidos.value.map((option) => option.filtros).flat().filter((filtro) => filtro.active);

  const abrigosFiltrados = filtrosHabilitados?.length === 0 ? abrigosPorCidade.value : abrigosPorCidade.value.filter((a) => filtrosHabilitados.every((f) => f.filter(a)));

  emit('filterChange', abrigosFiltrados);
}

function filterNecessities(shelter: Abrigo, necessity?: NecessidadeItem): boolean {
  const [
    forPeople,
    forPets,
  ] = filtrosPreDefinidos.value[0].filtros;
  const filterPeople = forPeople.active ? forPeople.filter(shelter) : true;
  const filterPets = forPets.active ? forPets.filter(shelter) : true;

  return filterPeople && filterPets && !!shelter.itensUteis?.find(({ item }) => item && necessity?.values.includes(formatNecessidade(item)));
}

watch([
  filtrosPreDefinidos,
  abrigosPorCidade,
], filtrarDados, {
  deep: true,
});
</script>

<template>
  <v-navigation-drawer
    temporary
    class="drawer-style overflow-hidden"
  >
    <div class="h-full flex flex-col filtros">
      <div class="p-5 relative shadow-xl rounded-b-2xl">
        <h2 class="font-bold text-center">
          Encontrar abrigo | Filtros
        </h2>

        <button
          class="p-4 absolute top-1/2 right-4 text-green-800 -translate-y-1/2"
          @click="() => emit('closeFilters')"
        >
          <ion-close-outline />
        </button>
      </div>

      <div class="flex-1 flex flex-col gap-1 p-5 pt-2 mt-2 overflow-auto">
        <div
          v-for="options in filtrosPreDefinidos"
          :key="options.title"
          class="option-container"
        >
          <div class="flex gap-1 align-center mb-2">
            <i v-html="options.icon" />

            <h3 class="options-title">
              {{ options.title }}
            </h3>
          </div>

          <div class="flex flex-col gap-2">
            <button
              v-for="filtro in options.filtros"
              :key="filtro.name"
              class="flex items-center justify-between"
              @click="() => (filtro.active = !filtro.active)"
            >
              <span class="text-gray-600">
                {{ filtro.name }}
                <strong
                  v-if="filtro.showCounter"
                  class="text-current"
                >
                  ({{ abrigos.filter(a => filtro.filter(a)).length }})
                </strong>
              </span>

              <v-checkbox
                :model-value="filtro.active"
                density="compact"
                color="#1351B4"
              />
            </button>
          </div>
        </div>
      </div>

      <div class="p-4 flex gap-2 border-t">
        <v-btn
          elevation="0"
          rounded="xl"
          class="flex-1"
          size="large"
          border="#CBCBCB sm"
          @click="limparFiltros"
        >
          Limpar filtros
        </v-btn>

        <v-btn
          elevation="0"
          rounded="xl"
          class="flex-1"
          size="large"
          color="primary"
          @click="() => emit('closeFilters')"
        >
          Aplicar
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss">
.v-btn__content {
  letter-spacing: 0;
  text-transform: none;
}

.v-checkbox-btn {
  max-width: 100%;
  flex-direction: row-reverse;
  justify-content: space-between;
  min-height: 24px !important;
  height: 24px;

  .v-label {
    display: block;
    max-width: calc(100% - 56px);
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #3E3E3E;
    opacity: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: normal;
    word-wrap: normal;
  }
}

.v-input__details {
  display: none;
}

.options-title {
  font-size: 14px;
  line-height: 24px;
  color: #1351B4;
  font-weight: 600;
}

.option-container {
  &:not(:last-of-type) {
    margin-bottom: 24px;
  }
}

.v-navigation-drawer__content {
  overflow-y: hidden !important;
}

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
