<template>
  <v-dialog v-model="exibir" persistent :max-width="largura" :return-value="resposta">
    <v-card>
      <v-card-title v-show="titulo">{{ titulo }}</v-card-title>

      <v-card-text>
        <slot>{{ texto }}</slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" ref="btnNao" @click="responder(false)" :disabled="loading">{{ botaoNao }}</v-btn>
        <v-btn variant="flat" ref="btnSim" :color="corBotaoSim" :loading="loading" @click="responder(true)">{{ botaoSim }}</v-btn >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>

const props = defineProps({
  titulo: {
    type: String,
    default: null,
  },
  texto: {
    type: String,
    default: null,
  },
  largura: {
    type: String,
    default: '400px',
  },
  dividers: {
    type: Boolean,
    default: false,
  },
  botaoSim: {
    type: String,
    default: 'Sim',
  },
  botaoNao: {
    type: String,
    default: 'Não',
  },
  corBotaoSim: {
    type: String,
    default: 'primary',
  }
});

const emit = defineEmits(['abrir', 'fechar']);

const exibir = ref(false);
const resposta = ref(false);
const loading = ref(false);
const btnSim = ref(null);
let resolve = null;
let reject = null;

const abrir = () => {
  exibir.value = true;
  emit('abrir');
  focusBtnSim();
  return new Promise((resolve_, reject_) => {
    resolve = resolve_;
    reject = reject_;
  });
};

const fechar = () => {
  stopLoading();
  exibir.value = false;
  emit('fechar');
};

const responder = (resposta) => {
  if (resposta == false) fechar();

  resolve(resposta);
};

const rejeitar = (resposta) => {
  fechar();
  reject(resposta);
};

const focusBtnSim = () => {
  setTimeout(() => {
    btnSim.value.$el.focus();
  }, 300);
};

const startLoading = () => {
  loading.value = true;
};

const stopLoading = () => {
  loading.value = false;
};

defineExpose({
  abrir,
  fechar,
  startLoading,
  stopLoading
});

</script>

<style scoped>
</style>
