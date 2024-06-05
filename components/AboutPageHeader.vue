<script setup lang="ts">
const props = defineProps({
  currentPage: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([
  'listItemClick',
]);

const items = [
  {
    name: 'about',
    label: 'SOBRE',
  },
  {
    name: 'volunteers',
    label: 'VOLUNTÁRIOS',
  },
  {
    name: 'contact',
    label: 'CONTATO',
  },
];
</script>

<template>
  <InstagramFloatingButton />

  <section class="section about-header">
    <div class="bg-about bg-cover bg-center w-100 h-100 flex-col items-center justify-center">
      <div class="flex-col items-center justify-center pt-48 md:pt-28">
        <div class="flex items-center justify-center">
          <img
            src="../assets/images/rs.png"
            alt="RS"
          >
        </div>

        <div class="flex items-center justify-center gap-6 pt-2">
          <a
            v-for="item in items"
            :key="item.name"
            :class="{ underline: item.name === props.currentPage }"
            href="#"
            class="about-header-item underline-offset-4"
            @click="() => emit('listItemClick', item.name)"
          >{{ item.label }}</a>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <img
          src="../assets/images/logo.png"
          alt="AbrigosRS"
          class="w-10/12 md:w-6/12"
        >
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-header{
    padding: 0;
    height: 600px;
}

.about-header-item {
    @apply
      transition-all
      duration-100
      cursor-pointer
    text-white
      font-semibold;

    &:hover {
      @apply
        font-bold;

    }
  }
</style>
