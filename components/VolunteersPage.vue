<script setup lang="ts">

</script>

<template>
  <div>
    <section class="section about text-xs sm:text-sm md:text-base">
      <div class="flex flex-col gap-6 md:px-4 lg:px-12 xl:px-[22rem]">
        <span class="font-semibold text-md md:text-3xl mx-auto pb-4 underline">
          VOLUNTÁRIOS
        </span>

        <!-- <div class="flex flex-wrap sm:flex-nowrap gap-2 md:gap-12"> -->
        <div class="w-full col text-justify">
          <p>
            Todo trabalho da plataforma é voluntário e é formado por pessoas, empresas e instituições do Estado que em uma revolucionária.
            Conheça abaixo as pessoas que contribuíram ou contribuem para o desenvolvimento e manutenção voluntário da plataforma:
          </p>
        </div>
      </div>
    </section>

    <VolunteerList />

    <section class="flex justify-center items-center">
      <img
        src="../assets/images/institutes/abrigosrs.png"
        alt="AbrigosRS"
      >
    </section>
  </div>
</template>

<style lang="scss" scoped>
</style>
