<script setup lang="ts">
interface ModalProps {
  open: boolean;
}

defineProps<ModalProps>();

const emit = defineEmits([
  'close',
]);

function close() {
  emit('close');
}
</script>

<template>
  <transition name="modal">
    <div
      v-if="open"
      class="w-full h-full flex items-end justify-center bg-black/50 fixed top-0 left-0 z-[1000] md:items-center"
      @click.self="close"
    >
      <div class="about-modal flex flex-col">
        <slot />

        <PrimaryButton
          color="primary"
          hover-color="orange"
          rounded="xl"
          size="x-large"
          text="Voltar"
          :click="close"
        />
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.about-modal {
  width: 100%;
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

@media (min-width: 768px) {
  .about-modal {
    width: 500px;
    padding: 50px 40px;
    border-radius: 16px;
    height: max-content;
    max-height: 80vh;
  }
}
</style>
