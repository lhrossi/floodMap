<script setup lang="ts">
//
</script>

<template>
  <section class="section timeline-section">
    <div class="timeline w-100 h-100 flex flex-col items-center justify-center gap-2 py-6">
      <div class="pb-4">
        <span class="font-semibold text-md md:text-3xl mx-auto text-white underline">
          TIMELINE
        </span>
      </div>

      <h2 class="font-semibold text-xl text-white">
        Início da crise
      </h2>

      <img
        class="w-screen md:w-2/5"
        src="../assets/images/timeline_objects.png"
        alt="AbrigosRS"
      >
    </div>
  </section>
</template>

<style lang="scss" scoped>
section span {
    display: table;
}

.timeline-section{
    padding: 0;
}

.timeline{
    background: conic-gradient(from 180deg at 50% 50%, #007A73 -37.69deg, #62AD9B 27.88deg, #64A898 87.13deg, #62AC9A 107.12deg, #5FB19E 136.53deg, #007A73 322.31deg, #62AD9B 387.88deg);

}
</style>
