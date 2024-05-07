<template>
  <v-text-field
    ref="input"
    v-model="model"
    v-bind="$attrs"
  >
    <template v-slot:append-inner>
      <v-btn 
        variant="tonal" 
        size="small" 
        icon="mdi-arrow-up"
        @click="upClick"
      ></v-btn>
      <v-btn 
        variant="tonal" 
        size="small" 
        icon="mdi-arrow-down"
        @click="downClick"
      ></v-btn>
    </template>
  </v-text-field>
</template>

<script setup>

const model = defineModel();
const input = ref(null);

const upClick = (event) => {
  model.value = Number(model.value) + 1;
  selectInput();
}

const downClick = (event) => {
  if (model.value <= 0) return;
  model.value = Number(model.value) - 1;
  selectInput();
}

const selectInput = () => {
  setTimeout(() => {
    input.value.select();
  }, 0);
}

</script>

<style lang="scss" scoped>

</style>