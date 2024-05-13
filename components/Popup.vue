<template>
  <LazyMapboxDefaultPopup
    :popup-id="`popup-${shelter.id}-${Math.random()}`"
    :lnglat="[shelter.longitude, shelter.latitude]"
    :options="{ closeOnClick: true, closeButton: true }"
  >
    <h3 v-if="shelter.nome">{{ shelter.nome }}</h3>

    <p v-if="shelter.address">{{ shelter.address }}</p>

    <p v-if="shelter.nome_contato || shelter.telefone" :style="!shelter.vagas ? 'margin-bottom: 8px' : ''">
      {{ shelter.nome_contato }}
      <span v-show="shelter.telefone">
        -
        <a :href="`tel:+55${SanitizedPhone}`">{{ shelter.telefone }}</a>
      </span>
    </p>

    <ContagemVagas :abrigo="shelter" />

    <Necessidades :abrigo="shelter" />

    <ComoChegar :abrigo="shelter" />
  </LazyMapboxDefaultPopup>
</template>

<script setup lang="ts">
import type { Shelter } from '~/models/Shelter';

const { shelter } = defineProps<{ shelter: Shelter }>();

const SanitizedPhone = computed(() => {
  if (shelter && shelter.telefone) {
    return String(shelter.telefone).replace(/\D/g, '');
  }
  return null;
});

</script>

<style lang="scss" scoped>
h3 {
  font-size: 22px;
  font-weight: bold;
  line-height: 130%;
  margin-bottom: 8px;
}

p {
  font-size: 12px;
  line-height: 150%;
  margin-bottom: 16px;

  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
}

a {
  text-decoration: underline;
}
</style>
