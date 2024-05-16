<template>
  <div ref="modal" class="about-modal max-w-[500px] flex flex-col">
    <slot></slot>
    
    <PrimaryButton
      color="primary"
      hoverColor="orange"
      rounded="xl"
      size="x-large"
      text="Voltar"
      :click="close"
    />
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

const emit = defineEmits(['close']);

const modal = ref<HTMLDivElement | null>(null);

function close() {
  emit('close');
}

onClickOutside(modal, close);
</script>

<style lang="scss">
.about-modal {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 20;
  background-color: white;
  padding: 32px 25px;
  border-radius: 16px 16px 0px 0px;
  gap: 20px;
  max-height: 90svh;

  .text {
    max-height: 90%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
      margin: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: #F5F5F5;
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #B2B2B2;
      border-radius: 4px;
      width: 8px;
    }
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.0025em;
    text-align: left;
    margin-bottom: 25px;
  }

  p {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.005em;
    text-align: left;
  }
}

@media (min-width: 600px) {
  .about-modal {
    width: 500px;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    padding: 50px 40px;
    border-radius: 16px;
    height: max-content;
    max-height: 80vh;
  }
}
</style>