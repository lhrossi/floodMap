<template>
  <v-layout>
    <v-app-bar flat class="border-b">
      <v-toolbar-title>
        <v-icon size="large">mdi-home-map-marker</v-icon>

        Localização dos abrigos
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <slot></slot>
    </v-main>
  </v-layout>
  <!-- <v-footer app name="nav" class="pa-0">
    <v-bottom-navigation
      class="w-100"
      :elevation="3"
      mandatory
      grow
    >
      <v-btn value="deliveries" rounded="lg" to="/">
        <v-icon size="large">mdi-home-map-marker</v-icon>
        <span>Albergues</span>
      </v-btn>

      <v-btn value="favorites" rounded="lg" to="/resgates">
        <v-icon size="large">mdi-map-marker-multiple</v-icon>
        <span>Resgates</span>
      </v-btn>
    </v-bottom-navigation>
  </v-footer> -->
</template>

<script setup>

</script>

<style lang="scss">
</style>
