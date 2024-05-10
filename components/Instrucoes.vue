<template>
  <div class="text">
    <h3>Aprenda como utilizar o mapa</h3>
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
  </div>

</template>

<script setup>
</script>

<style lang="scss">
h3 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.0025em;
  text-align: left;
}

.steps {
  padding: 0;
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
</style>