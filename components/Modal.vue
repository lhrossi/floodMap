<template>
  <v-container class="about-modal flex flex-col" max-width="500px">
    <slot></slot>
    
    <PrimaryButton
      color="primary"
      hoverColor="organge"
      rounded="xl"
      size="x-large"
      text="Voltar"
      :click="() => props.click()"
    />
  </v-container>
</template>

<script setup>
const props = defineProps({
  click: Function,
})
</script>

<style lang="scss">
.about-modal {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 10;
  background-color: white;
  padding: 32px 25px;
  border-radius: 16px 16px 0px 0px;
  gap: 20px;
  max-height: 90vh;

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