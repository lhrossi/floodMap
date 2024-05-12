<template>
  <v-app>

    <v-app-bar flat title="Localização das tropas" color="white">

      <template v-slot:prepend>
        <v-icon size="40">mdi-home-map-marker</v-icon>
      </template>
        
        <v-btn icon @click="logout" color="primary">
          <v-icon>mdi-logout</v-icon>
          <!-- <v-tooltip location="bottom" activator="parent">Logout</v-tooltip> -->
        </v-btn>

    </v-app-bar>

    <v-main>
      <slot></slot>

    </v-main>
  </v-app>

</template>

<script setup>
const auth = useUserAuth();

const logout = () => {
  auth.logout();
  navigateTo({ path: "/login" });
};

// const isLoggedIn = computed(() => auth.isLoggedIn());

</script>

<style lang="scss"></style>
