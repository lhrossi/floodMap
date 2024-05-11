<template>
  <LazyMapboxDefaultPopup
    :popup-id="`popup-${abrigo.id}`"
    :lnglat="[abrigo.longitude, abrigo.latitude]"
    :options="{ closeOnClick: true, closeButton: true }"
  >
    <h3 v-if="abrigo.nome">{{ abrigo.nome }}</h3>

    <p v-if="abrigo.address">{{ abrigo.address }}</p>

    <p v-if="abrigo.nome_contato || abrigo.telefone">
      {{ abrigo.nome_contato }}
      <span v-show="abrigo.telefone">- {{ abrigo.telefone }}</span>
    </p>

    <v-divider class="my-2" />

    <ContagemVagas :abrigo="abrigo" />

    <Necessidades :abrigo="abrigo" />

    <ComoChegar :abrigo="abrigo" />
  </LazyMapboxDefaultPopup>
</template>

<script setup lang="ts">
defineProps<{ abrigo: any }>();
</script>