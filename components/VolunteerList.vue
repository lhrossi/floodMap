<script setup lang="ts">
const volunteers = ref([
  {
    id: 1,
    name: 'Guilherme Tischer',
    role: 'Herói',
    description: 'Apagando incendio desde 2020',
  },
  {
    id: 2,
    name: 'Luciano Andrade',
    role: 'Dev/PO/StakeHolder/Herói/SR',
    description: 'É ele, n adianta',
  },
]);
</script>

<template>
  <section class="container mx-auto py-8 sm:px-4 md:px-20">
    <div class="volunteers-grid volunteers-grid-cols-1 sm:volunteers-grid-cols-3 gap-4">
      <div
        v-for="volunteer in volunteers"
        :key="volunteer.id"
        class="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <h2 class="text-xl font-semibold">
          {{ volunteer.name }}
        </h2>

        <p class="text-gray-600">
          {{ volunteer.role }}
        </p>

        <p class="text-gray-500">
          {{ volunteer.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.volunteers-grid {
  display: grid;
}
.volunteers-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.sm\:volunteers-grid-cols-3 {
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
