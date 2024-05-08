<template>
  <v-dialog 
    v-model="modal" 
    scrollable 
    :fullscreen="$vuetify.display.smAndDown" 
    :max-width="width"
  >
      
    <v-card>
      <v-card-title>
        Adicionar novo pelotão
      </v-card-title>
      <v-divider class="my-0"></v-divider>

      <v-card-text class="pa-0" style="height: 500px">
        <v-container>
          <v-text-field label="Número do Pelotão" v-model="payloadForm.numero_pelotao"></v-text-field>
          <v-text-field label="Nome do Militar Responsável" v-model="payloadForm.nome_militar_resp"></v-text-field>
          <v-select
            label="Risco da situação"
            :items="['1 - BAIXO', '2 - MÉDIO', '3 - ALTO RISCO']"
            v-model="payloadForm.situacao"
          ></v-select>
          <v-text-field label="Endereço" v-model="payloadForm.endereco"></v-text-field>
          <v-text-field label="Lagitude" v-model="payloadForm.latitude" v-bind:model-value="coords.latitude" :disabled="true"></v-text-field>
          <v-text-field label="Longitude" v-model="payloadForm.longitude" v-bind:model-value="coords.longitude" :disabled="true"></v-text-field>
          <v-checkbox label="Atendimento pré Hospitalar" v-model="payloadForm.aph"></v-checkbox>
          <v-text-field label="Civis Resgatados" v-model="payloadForm.quantidade_civis"></v-text-field>
          <v-text-field label="Pets resgatados" v-model="payloadForm.quantidade_pets"></v-text-field>
          <v-select
          multiple
            label="Transporte de acesso"
            :items="['A pé', 'Carro', 'Moto', 'Ambulância', 'Caminhão', 'Helicóptero', 'Barco']"
            v-model="payloadForm.transporte"
          ></v-select>
        
        </v-container>
      </v-card-text>

      <v-divider class="my-0"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Cancelar"
          @click="modal = false"
        ></v-btn>
        <v-btn
          variant="flat"
          color="primary"
          text="Salvar"
          @click="handleSubmit"
        ></v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script setup>

const props = defineProps({
  width: {
    type: [Number, String] ,
    default: 600
  },
  missao: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits([
  'onSubmit'
]);

const modal = ref(false);

const payloadForm = reactive({
  numero_pelotao: '',
  nome_militar_resp: '',
  situacao: '',
  endereco: '',
  latitude: '',
  longitude: '',
  aph: false,
  quantidade_civis: '',
  quantidade_pets: '',
  transporte: []
})

const { coords } = useGeolocation()

async function handleSubmit() {
  // modal.value = false
  
  // const { data: result } = await useFetch<any>('/api/missoes', { method:'post', body: payloadForm });
  // modal.value = false
  // emits('onSubmit', result)
}

const abrir = function() {
  payloadForm = props.missao;
  modal.value = true
}

const fechar = function() {
  modal.value = false
}

defineExpose({
  abrir,
  fechar
})

</script>

<style lang="scss" scoped>

</style>