<template>
  <LazyMapboxDefaultPopup
    :popup-id="`popup-${abrigo.id}-${Math.random()}`"
    :lnglat="[abrigo.longitude, abrigo.latitude]"
    :options="{ closeOnClick: true, closeButton: true }"
  >
    <h3 v-if="abrigo.nome">{{ abrigo.nome }}</h3>

    <p v-if="abrigo.address">{{ abrigo.address }}</p>

    <p v-if="abrigo.nome_contato || abrigo.telefone" :style="!abrigo.vagas ? 'margin-bottom: 8px' : ''">
      {{ abrigo.nome_contato }}
      <span v-show="abrigo.telefone">
        -
        <a :href="`tel:+55${SanitizedPhone}`">{{ abrigo.telefone }}</a>
      </span>
    </p>

    <ContagemVagas :abrigo="abrigo" />

    <Necessidades :abrigo="abrigo" />

    <ComoChegar :abrigo="abrigo" />
  </LazyMapboxDefaultPopup>
</template>

<script setup lang="ts">
const { abrigo } = defineProps<{ abrigo: any }>();

const SanitizedPhone = computed(() => {
  if (abrigo && abrigo.telefone) {
    return String(abrigo.telefone).replace(/\D/g, '');
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
