<template>
  <v-fab
    v-bind="$attrs"
    v-show="showFab"
    icon="mdi-plus"
    color="#009688"
    location="bottom right"
    size="64"
    absolute
    app
    appear
    style="bottom: 50px"
    @click="onClick"
  ></v-fab>
</template>

<script setup>

const props = defineProps({
  showFab: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits([
  'onClick'
]);

const onClick = () => {
  emits('onClick')
}

const teste = () => {
  console.log('teste 123')
}

defineExpose({
  teste
})

</script>

<style lang="scss" scoped>

</style>