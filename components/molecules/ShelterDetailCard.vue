<template>
  <div class="card-container">
    <div class="card-header">
      <Capsule iconName="tabler:refresh" :content="formattedUpdatedAt"/>
      <ShelterAvatar :occupationUtils="occupationUtils"/>
    </div>

    <div class="card-content">
      <h2>{{ shelter?.nome }}</h2>
      <p>{{ shelter?.address }}</p>

      <div v-if="!!needsList.length || isCityCentralizedDonations" class="card-needs__wrapper">
        <h3>Necessidades</h3>

        <div v-if="isCityCentralizedDonations">
          <p v-if="isManagedByGovern">
            Para doações aos abrigos gerenciados pela prefeitura, por favor, saiba os locais de doação acessando
            <a href="https://prefeitura.poa.br/" target="_blank">https://prefeitura.poa.br/</a>
          </p>
          <p v-else>
            Para doações para esse abrigo, por favor, verifique as
            <a href="https://sos-rs.com/" target="_blank">informações nesse link.</a>
          </p>
        </div>

        <TagList v-else-if="!!needsList.length" :data="needsList"/>
      </div>
    </div>

    <div class="card-footer">
      <button @click="linkToMaps" class="card-footer__button">Direções</button>
      <button v-if="!!shelter.telefone" @click="callToPhone" class="card-footer__button">Ligar</button>
      <button v-if="!!shelter.telefone" @click="linkToWhatsapp" class="card-footer__button whatsapp-button">Whatsapp</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Abrigo } from '~/models/Abrigo';
  import OccupationUtils from '~/utils/occupationUtils';
  import { getShelterUtils } from '~/utils/shelterUtils';

  const { shelter } = defineProps<{ shelter: Abrigo}>();

  const {
    linkToWhatsapp,
    linkToMaps,
    callToPhone,
    getFormattedLastUpdated,
    getNeedsList,
    getIsManagedByGovern,
    getIsCityCentralizedDonations,
  } = getShelterUtils(shelter);

  const occupationUtils = computed(() => new OccupationUtils(shelter));
  const formattedUpdatedAt = computed(() => `Atualizado ${getFormattedLastUpdated()}`)
  const needsList = computed(() => getNeedsList())
  const isManagedByGovern = computed(() => getIsManagedByGovern())
  const isCityCentralizedDonations = computed(() => getIsCityCentralizedDonations())

</script>

<style lang="scss" scoped>
  .card-container {
    @apply
      flex
      flex-col
      w-full
      bg-white
      rounded-3xl
      shadow-sm
      p-4
  }

  .card-header {
    @apply
      flex
      items-center
      justify-between
      mb-4
  }

  .card-content {
    @apply
      border-b
      mb-4
      pb-4;

      h2 {
        @apply
          text-[#020202]
          text-[18px]
          font-[700]
          mb-2
      }
  }

  .card-needs__wrapper {
    @apply
      mt-4
      border-t
      border-[#F1F1F1]
      pt-4
  }

  .card-needs__wrapper h3 {
    @apply
      text-[#020202]
      font-[700]
      mb-2
  }

  .card-footer {
    @apply
      flex
      items-center
      justify-between
      gap-[16px]
      /* laptop:max-w-[60%]; */

  }

  .card-footer__button {
    @apply
      h-[40px]
      bg-[#E3EDFD]
      text-[#114DE6]
      font-[500]
      rounded-3xl
      flex-1;
  }

  .whatsapp-button {
    @apply
      text-white
      bg-[#02952B]
  }
</style>