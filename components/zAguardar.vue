<template>
  <v-dialog v-model="exibir" persistent :max-width="largura">
    <v-card>
      <v-card-text class="pa-3">
        <v-row>
          <v-col cols="3">
            <v-progress-circular
              indeterminate
              :size="40"
              :color="color"
            ></v-progress-circular>
          </v-col>
          <v-col cols="9" align-self="center">
            <span class="text--primary subtitle-1">Aguarde um momento...</span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from 'vue';

const exibir = ref(false);

const props = defineProps({
  titulo: {
    type: String,
  },
  texto: {
    type: String,
  },
  largura: {
    type: String,
    default: "300px",
  },
  color: {
    type: String,
    default: "green darken-2",
  },
});

const emit = defineEmits(['abrir', 'fechar']);

function abrir(timeout = 0) {
  exibir.value = true;
  emit('abrir');
  if (timeout > 0) {
    setTimeout(() => {
      fechar();
    }, timeout);
  }
}

function fechar() {
  exibir.value = false;
  emit('fechar');
}

async function executar(cb) {
  abrir();
  await cb();
  fechar();
}

defineExpose({
  abrir,
  fechar,
  executar
});

</script>

<style scoped>
</style>
