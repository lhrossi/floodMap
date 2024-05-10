<template>
  <v-layout>
    <v-app-bar flat class="border-b">
      <v-toolbar-title class="mr-4">
        <div class="flex">
          <div class="flex items-end align-center">
            <div class="mr-2">
              <AbrigaRsLogo />
            </div>
          </div>
          <div class="flex flex-auto"></div>
          <div class="flex align-center">
            <v-btn
              color="dark"
              text
              :class="{ active: currentButton === 'mapa', 'menu-item': true }"
              @click="() => selectButton('mapa')"
            >
              <span>Mapa</span>
              <div class="underline"></div>
            </v-btn>
            <v-btn
              color="dark"
              text
              :class="{ active: currentButton === 'sobre', 'menu-item': true }"
              @click="() => selectButton('sobre')"
              >Sobre
              <div class="underline"></div>
            </v-btn>
            <v-btn
              color="dark"
              text
              href="https://abrigospoa.web.app/login"
              target="_blank"
              >Login</v-btn
            >
          </div>
        </div>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <Modal
        v-if="currentButton === 'sobre'"
        :click="() => selectButton('mapa')"
      >
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

.v-toolbar.v-toolbar--flat .v-toolbar__content {
  height: 84px !important;
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
