<script setup lang="ts">
const volunteers = getContributors();
</script>

<template>
  <section class="container mx-auto py-8 sm:px-4 md:px-20">
    <div class="volunteers-grid volunteers-grid-cols-1 sm:volunteers-grid-cols-3 gap-4">
      <div
        v-for="volunteer in volunteers"
        :key="volunteer.name"
        class="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <h2 class="text-xl font-semibold">
          {{ volunteer.name }}
        </h2>

        <p class="text-gray-600">
          {{ volunteer.workplace }}
        </p>

        <p class="text-gray-500">
          {{ volunteer.city_state }}
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
