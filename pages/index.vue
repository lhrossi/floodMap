<template>
  <v-container>
    <v-container>
      <v-row class="mt-4">
        <v-col>
          <MapboxMap
            :map-id="`mapid`"
            style="position: absolute; top: 0; bottom: 0; left: 0; width: 100%; height: 100%"
            :options="{
              style: 'mapbox://styles/mapbox/streets-v12',
              center: [-51.1771419, -30.1088701],
              zoom: 10
            }"
          >
            <MapboxDefaultMarker
              v-for="item of items"
              :marker-id="`marker-${item.id}`"
              :key="item.id"
              :lnglat="[item.longitude, item.latitude]"
              :options="{ 
                color: item.situacao === 1 ? 'green' : item.situacao === 2 ? 'yellow' : 'red',
              }"
            >
              <MapboxDefaultPopup
                :popup-id="`popup-${item.id}`"
                :lnglat="[item.longitude, item.latitude]"
                :options="{
                  closeOnClick: false
                }"
              >
              <!-- faça um output de texto do status de gravidade baseado na variável item.situacao, verificando se o valor da variável for igual a 1 (baixo), 2 (médio) e 3 (alto)-->
                
              <h3>{{ item.nome_militar_resp }} - {{item.civis}} civis - </h3>
              {{ item.situacao === 1 ? 'Baixo' : item.situacao === 2 ? 'Médio' : 'Alto' }} Risco
                <p>{{ item.coordenadas }} <br> {{ item.endereco }}</p><br>
                <p v-if="item.situacao_acamados">{{ item.situacao_acamados }}</p>
                <p> Transporte:  {{ item.transporte }} </p>
              </MapboxDefaultPopup>
            </MapboxDefaultMarker>
            <MapboxGeolocateControl position="bottom-left" />
          </MapboxMap>
        </v-col>
      </v-row>
      
      <v-fab
        @click="modal = true"
        icon="mdi-plus"
        color="blue"
        class="ms-4 mb-4"
        location="bottom right"
        size="64"
        absolute
        app
        appear
      ></v-fab>
    </v-container>

    <v-dialog v-model="modal" max-width="600">
        <template v-slot:default="{ isActive }">
          <v-card title="Adicionar uma nova Missão">
            <v-container>
              <v-text-field label="Número do Pelotão" v-model="payloadForm.numero_pelotao"></v-text-field>
              <v-text-field label="Nome do Militar Responsável" v-model="payloadForm.nome_militar_resp"></v-text-field>
            </v-container>
      
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text="Salvar"
                @click="handleSubmit"
              ></v-btn>
              <v-btn
                text="Cancelar"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: () => 'Localização das Tropas'
})

const modal = ref(false)

const payloadForm = reactive({
  numero_pelotao: "asdad",
  nome_militar_resp: "asdasd"
})

function handleSubmit() {
  modal.value = false
  console.log(payloadForm)
}

const items = ref([
  {
    longitude: -51.150350635190655,
    latitude: -30.049900789428545,
    id: "1SazynPW6hAHbiyS57cs",
    nome_militar_resp: "Alan Cardec",
    civis:"05",
    situacao: 2, // 1 - baixo, 2 - médio, 3 - alto risco
    coordenadas: "-30.049900789428545, -51.150350635190655",
    endereco: "Avenida Alcides São Severiano, 100 bairro sarandi",
    situacao_acamados:"Precisa de Transporte de acamados",
    aph: false,
    transporte: "carro" // carro, moto, ambulância, caminhão, helicóptero, barco
  }
])
</script>

<style lang="scss">
</style>


<!--

informações mostradas no formulário front:
  1 - numero_pelotao: "1"
  2 - nome_militar_resp: "Alan Cardec",
  3 - Risco da situação: 2, // 1 - baixo, 2 - médio, 3 - Eminente
  4 - endereco: "Avenida Alcides São Severiano, 100 bairro sarandi",
  5 - situacao_acamados: sim ou nao,
  6 - Atendimento pré Hospitalar (aph): Sim ou não,
  7 - Civis Resgatados:"05",
  8 - pets: 10,
  9 - Transporte de acesso: "carro" // carro, moto, ambulância, caminhão, helicóptero, barco
  10 - coordenadas: x // só no front

-->