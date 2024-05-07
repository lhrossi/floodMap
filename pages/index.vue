<template>
  <v-container>
    <MapboxMap
      map-id="map"
      style="
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
      "
      :options="{
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-51.1771419, -30.1088701],
        zoom: 10,
      }"
    >
      <template v-if="items.length > 0">
        <MapboxDefaultMarker
          v-for="item in items"
          :marker-id="`marker-${item.id}`"
          :key="item.id"
          :lnglat="[item.longitude, item.latitude]"
          :options="{ color: corMarcador(item.situacao) }"
        >
          <LazyMapboxDefaultPopup
            :popup-id="`popup-${item.id}`"
            :lnglat="[item.longitude, item.latitude]"
            :options="{ closeOnClick: true, closeButton: true }"
          >
            <v-card flat>
              <v-card-text>
                <v-row dense>
                  <v-col cols="6">
                    <div>
                      <div class="text-body-2 font-weight-bold">
                        Número Pelotão
                      </div>
                      <div>{{ item.numero_pelotao || "Não informado" }}</div>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div>
                      <div class="text-body-2 font-weight-bold mb-1">Risco</div>
                      <div>
                        <v-chip
                          color="green"
                          variant="flat"
                          density="comfortable"
                          v-if="item.situacao === 1"
                          >Baixo</v-chip
                        >
                        <v-chip
                          color="orange"
                          variant="flat"
                          density="comfortable"
                          v-if="item.situacao === 2"
                          >Médio</v-chip
                        >
                        <v-chip
                          color="red-darken-4"
                          variant="flat"
                          density="comfortable"
                          v-if="item.situacao === 3"
                          >Alto</v-chip
                        >
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div>
                      <div class="text-body-2 font-weight-bold">
                        Militar Responsável
                      </div>
                      <div>{{ item.nome_militar_resp }}</div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div>
                      <div class="text-body-2 font-weight-bold">Endereço</div>
                      <div>{{ item.endereco }}</div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div>
                      <div class="text-body-2 font-weight-bold">Aph</div>
                      <div>
                        <span>{{ item.aph === 1 ? "Sim" : "Não" }}</span>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div>
                      <div class="text-body-2 font-weight-bold">
                        Civis Resgatados
                      </div>
                      <v-chip
                        color="green"
                        variant="flat"
                        density="comfortable"
                        >{{ item.quantidade_civis || "Não informado" }}</v-chip
                      >
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div>
                      <div class="text-body-2 font-weight-bold">
                        Quantidade Pets
                      </div>
                      <div style="min-height: 15px">
                        <v-chip
                          color="green"
                          variant="flat"
                          density="comfortable"
                          >{{ item.quantidade_pets || "Não informado" }}</v-chip
                        >
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div>
                      <div class="text-body-2 font-weight-bold">
                        Meios de Acesso
                      </div>
                      <div>
                        <template v-for="(trans, index) in item.transporte">
                          {{ trans
                          }}<span v-if="index < item.transporte.length - 1"
                            >,
                          </span>
                        </template>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div>
                      <div class="text-body-2 font-weight-bold">
                        Coordenadas
                      </div>
                      <div>
                        Latitude: {{ item.latitude }}<br />
                        Longitude: {{ item.longitude }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions
                class="d-flex flex-row justify-between"
                style="gap: 5px"
              >
                <v-btn
                  text="Editar"
                  color="primary"
                  variant="flat"
                  size="small"
                  class="mx-0 flex-grow-1"
                  :loading="loading"
                  @click="editarMissao(item.id)"
                ></v-btn>
                <v-btn
                  text="Excluir"
                  color="red"
                  variant="flat"
                  size="small"
                  class="mx-0 flex-grow-1"
                  :disabled="loading"
                  @click="deleteMissao(item)"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </LazyMapboxDefaultPopup>
        </MapboxDefaultMarker>
      </template>
      <MapboxGeolocateControl position="bottom-left" />
    </MapboxMap>

    <v-dialog
      v-model="modal"
      scrollable
      :fullscreen="$vuetify.display.smAndDown"
      :max-width="600"
    >
      <v-card>
        <v-card-title>
          {{ !!payloadForm.id ? "Editar" : "Adicionar" }} missão
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text style="height: 500px">
          <v-form ref="form" v-model="form_valid" lazy-validation>
            <v-row dense>
              <v-col cols="12" sm="12">
                <v-text-field
                  label="Número do Pelotão"
                  v-model="payloadForm.numero_pelotao"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-text-field
                  label="Nome do Militar Responsável"
                  v-model="payloadForm.nome_militar_resp"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-select
                  label="Risco da situação"
                  :items="situacoes"
                  v-model="payloadForm.situacao"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="12">
                <v-text-field
                  label="Endereço"
                  v-model="payloadForm.endereco"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  label="Lagitude (Leitura)"
                  v-model="payloadForm.latitude"
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  label="Longitude (Leitura)"
                  v-model="payloadForm.longitude"
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-checkbox
                  color="primary"
                  label="Atendimento pré Hospitalar"
                  v-model="payloadForm.aph"
                ></v-checkbox>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  label="Civis Resgatados"
                  v-model="payloadForm.quantidade_civis"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  label="Pets resgatados"
                  v-model="payloadForm.quantidade_pets"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-select
                  color="primary"
                  multiple
                  label="Transporte de acesso"
                  :items="[
                    'A pé',
                    'Carro',
                    'Moto',
                    'Ambulância',
                    'Caminhão',
                    'Helicóptero',
                    'Barco',
                  ]"
                  v-model="payloadForm.transporte"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12"> </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Cancelar"
            :disabled="loading"
            @click="modal = false"
          ></v-btn>
          <v-btn
            variant="flat"
            color="primary"
            text="Salvar"
            :disabled="!form_valid"
            :loading="loading"
            @click="salvarMissao"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-fab
      v-show="showFab"
      icon="mdi-plus"
      color="#009688"
      location="bottom right"
      size="64"
      absolute
      app
      appear
      style="bottom: 50px"
      @click="novaMissao"
    ></v-fab>

    <v-snackbar v-model="snackbar.show" vertical bottom timeout="3000">
      <span v-html="snackbar.message"></span>
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false">Fechar</v-btn>
      </template>
    </v-snackbar>

    <z-dialogo-sim-nao
      ref="dialogoExcluirMissao"
      titulo="Remover missão?"
      botaoSim="Remover"
      botaoNao="Cancelar"
      largura="500"
      texto="Essa missão será excluída. Deseja continuar?"
    ></z-dialogo-sim-nao>
  </v-container>
</template>

<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";

const { coords } = useGeolocation();
const loading = ref(false);
const items = ref([]);
const modal = ref(false);
const showFab = ref(false);
const form = ref(null);
const form_valid = ref(false);
const dialogoExcluirMissao = ref(null);
const situacoes = [
  { title: "1 - BAIXO", value: 1 },
  { title: "2 - MÉDIO", value: 2 },
  { title: "3 - ALTO RISCO", value: 3 },
];
const payloadForm = ref({
  numero_pelotao: "",
  nome_militar_resp: "",
  situacao: 2,
  endereco: "",
  latitude: 0,
  longitude: 0,
  aph: false,
  quantidade_civis: null,
  quantidade_pets: null,
  transporte: [],
});
const snackbar = ref({
  show: false,
  message: "Mapa carregado com sucesso.",
});
const rules = ref({
  required: (value) => !!value || "Campo obrigatório",
});

await carregarMissoes();

const notify = (message) => {
  snackbar.value.show = true;
  snackbar.value.message = message;
};

async function novaMissao() {
  resetForm();
  // payloadForm.value.latitude = -30.090398
  // payloadForm.value.longitude = -51.328853
  modal.value = true;
}

async function carregarMissoes() {
  const { data: missoes } = await useFetch("/api/missoes");
  items.value = <Array>missoes.value;
}

async function salvarMissao() {
  try {
    loading.value = true;
    if (!!payloadForm.value.id) {
      const { data: response } = await useFetch<any>(
        `/api/missao/${payloadForm.value.id}`,
        { method: "put", body: payloadForm.value }
      );
      await carregarMissoes();
    } else {
      const { data: response } = await useFetch<any>("/api/missoes", {
        method: "post",
        body: payloadForm.value,
      });
      const { data: missao } = await useFetch<any>(
        `/api/missao/${response.value.id}`
      );
      items.value.push(missao.value);
    }
    modal.value = false;
    notify("Missão salva com sucesso.");
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
}

async function editarMissao(missao_id) {
  try {
    loading.value = true;
    const { data: response } = await useFetch<any>(`/api/missao/${missao_id}`);
    payloadForm.value = response.value;
    modal.value = true;
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
}

async function deleteMissao(missao) {
  const response = await dialogoExcluirMissao.value.abrir();
  if (response == true) {
    try {
      dialogoExcluirMissao.value.startLoading();
      await useFetch<any>(`/api/missao/${missao.id}`, { method: "delete" });
      await carregarMissoes();
      notify("Missão excluída com sucesso.");
    } catch (error) {
      console.log("error", error);
    } finally {
      dialogoExcluirMissao.value.fechar();
      dialogoExcluirMissao.value.stopLoading();
    }
  }
}

const corMarcador = function (situacao) {
  return situacao === 1 ? "green" : situacao === 2 ? "yellow" : "red";
};

const resetForm = function () {
  (payloadForm.value.numero_pelotao = ""),
    (payloadForm.value.nome_militar_resp = ""),
    (payloadForm.value.situacao = 2),
    (payloadForm.value.endereco = ""),
    (payloadForm.value.aph = false),
    (payloadForm.value.quantidade_civis = null),
    (payloadForm.value.quantidade_pets = null),
    (payloadForm.value.transporte = []);
};

useHead({
  titleTemplate: () => "Localização das Tropas",
});

useMapbox("map", (map: any) => {
  map._markers.forEach(({ _popup: popup }: any) => {
    popup.remove();
  });
});

watch(coords, (newCoords) => {
  if (newCoords.latitude != Infinity) {
    showFab.value = true;
    payloadForm.value.latitude = newCoords.latitude;
    payloadForm.value.longitude = newCoords.longitude;
  }
});
</script>

<style lang="scss">
.civis {
  color: #071d41;
  border-radius: 10px; /* Ajuste o valor conforme necessário */
  padding: 5px 10px; /* Ajuste o preenchimento conforme necessário */
  display: inline-block; /* Garante que as bordas arredondadas funcionem corretamente */
}

.no-lineclamping {
  -webkit-line-clamp: unset !important;
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
}

.mapboxgl-popup-content {
  min-width: 400px;
}

@media screen and (max-width: 600px) {
  .mapboxgl-popup-content {
    min-width: 300px;
  }
}

.mapboxgl-popup-close-button {
  width: 25px;
  height: 25px;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  padding-bottom: 0px;

  &:focus {
    outline: none;
  }
}
</style>
