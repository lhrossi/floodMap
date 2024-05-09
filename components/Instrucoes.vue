<template>
  <v-container class="instructions-modal flex flex-col">
    <div class="title">
      <h3>Aprenda como utilizar o mapa</h3>
    </div>
    <v-container class="steps mb-5">
      <div class="step">
        <div>
          <div class="step-title">
            <div class="tag">
              <p>Passo 1</p>
            </div>
            <h4>Procure pelo abrigo</h4>
          </div>
          <div class="content">
            <p>Procure pelo abrigo que deseja informações de como ajudar na sua região ou filtre os abrigos que mais
              precisam do tipo de doação que você quer fazer</p>
          </div>
          <img src="../assets/images/step1.png" alt="">
        </div>
      </div>
      <div class="step">
        <div>
          <div class="step-title">
            <div class="tag">
              <p>Passo 2</p>
            </div>
            <h4>Entre em contato</h4>
          </div>
          <div class="content">
            <p>Entre em contato com o abrigo para combinar a entrega!</p>
          </div>
          <img src="../assets/images/step1.png" alt="">
        </div>
      </div>
    </v-container>
    <PrimaryButton fullWidth color="primary" rounded="xl" size="x-large" text="Voltar" :click="() => props.closeModal()" />
  </v-container>
</template>

<script setup>
const props = defineProps({
  closeModal: Function,
})
</script>

<style scoped lang="scss">
.instructions-modal {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 20px;
  border-radius: 10px 10px 0 0;
  max-height: 90vh;
  z-index: 5;
  max-width: 500px;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2rem;
    letter-spacing: 0.0025em;
    text-align: left;
  }

  .steps {
    padding: 0;
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

    .step {
      margin-bottom: 20px;

      &-title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .tag {
          background-color: #114DE6;
          color: white;
          border-radius: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
        }

        h4 {
          font-size: 20px;
          font-weight: 600;
          line-height: 28px;
          letter-spacing: 0.0025em;
          text-align: left;

        }

        .content p {
          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1.5rem;
          letter-spacing: 0.005em;
          text-align: left;

        }
      }

      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>