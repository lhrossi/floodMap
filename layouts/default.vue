<template>
  <v-layout>
    <v-app-bar class="border-b">
      <v-toolbar-title>
        <div class="flex">
          <AbrigaRsLogo />
          <div class="flex align-center">
            <v-btn color="dark" text :class="{ active: currentButton === 'mapa', 'menu-item': true }" @click="() => selectButton('mapa')">
              <span>Mapa</span>
              <div class="underline"></div>
            </v-btn>
            <v-btn color="dark" text :class="{ active: currentButton === 'sobre', 'menu-item': true }" @click="() => selectButton('sobre')"
              >Sobre
              <div class="underline"></div>
            </v-btn>
            <v-btn color="dark" text href="https://abrigospoa.web.app/login" target="_blank">Login</v-btn>
          </div>
        </div>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <Modal v-if="currentButton === 'sobre'" @close="selectButton('mapa')">
        <AboutModal />
      </Modal>
      <slot></slot>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from "vue";

const currentButton = ref("mapa");
const selectButton = (button) => {
  currentButton.value = button;
};
</script>

<style lang="scss">
.menu-item {
  .underline {
    display: none;
  }
}

.v-toolbar {
  border-radius: 0 0 16px 16px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.16);
}

.v-btn__content {
  position: relative;
  display: flex;
}

.active {
  color: #1351b4 !important;

  .underline {
    height: 3px;
    position: absolute;
    display: block;
    border-radius: 100px;
    background-color: #4e9fff;
    bottom: -6px;
    width: 100%;
    max-width: 100%;
    opacity: 0.25;
  }
}
</style>
