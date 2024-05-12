<template>
  <!-- <v-app> -->
    <!-- <v-main> -->
        <v-container class="fill-height">
          <v-row justify="center" align_="center">
            <v-col cols="12" sm="8" md="8" lg="6" xl="3" xxl="3">
              <v-card>

                <v-card-text class="pa-6 text-center">
                  <v-form v-model="form_valido" ref="form">
                    <h1 class="text-h4 mb-10">Acesso ao Sistema</h1>

                    <v-avatar color="primary" size="120" class="mb-10">
                      <v-icon dark size="70">mdi-lock</v-icon>
                    </v-avatar>

                    <v-row justify="center" dense class="mb-3">
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="usuario.email"
                          color="primary"
                          label="Usuário"
                          required
                          autofocus
                          placeholder=" "
                          prepend-inner-icon="mdi-account"
                          :rules="regras.email"
                          :error="erros.email.length > 0"
                          :error-messages="erros.email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          ref="input_senha"
                          v-model="usuario.password"
                          color="primary"
                          label="Senha"
                          placeholder=" "
                          prepend-inner-icon="mdi-lock"
                          required
                          :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show_password ? 'text' : 'password'"
                          :rules="regras.password"
                          :error="erros.password.length > 0"
                          :error-messages="erros.password"
                          @click:append-inner="show_password = !show_password"
                          @keypress.enter="login"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row justify="center" dense>
                      <v-col align="center">
                        <v-btn block variant="flat" color="primary" @click="login">Entrar</v-btn>
                      </v-col>
                    </v-row>
                    <!-- <v-col cols="12" class="text-center text-caption pa-0">
                      {{ config.APP_VERSION }}
                    </v-col> -->
                  </v-form>
                </v-card-text>

              </v-card>
            </v-col>
          </v-row>
        </v-container>
    <!-- </v-main> -->

    <z-aguardar ref="aguardar" color="primary"></z-aguardar>
  <!-- </v-app> -->
</template>

<script setup>
definePageMeta({
  layout: 'fullscreen'
})

const config = useRuntimeConfig()

// const { name } = useDisplay()

const auth = useUserAuth();


const form = ref(null);
const input_senha = ref(null);
const form_valido = ref(false);
const show_password = ref(false);
const aguardar = ref(null);

const usuario = reactive({
  "email": "",
  "password": ""
});

const erros = reactive({
  email: [],
  password: [],
});

let regras = {
  email: [(v) => !!v || "Informar o nome do usuário"],
  password: [(v) => !!v || "Informar a senha do usuário"],
};

onMounted(() => {
  form.value.reset();
  usuario.email = "army.teste@gmail.com"
  usuario.password = "army.teste@gmail.com"
});

const login = async () => {
  const { valid } = await form.value.validate();

  if (!valid) return

  try {

    aguardar.value.abrir();
    await auth.login(usuario);
    navigateTo({ path: "/" });

  } catch (error) {

    erros.password.push("Usuário ou senha inválidos");
    input_senha.value.focus();
    throw error;

  } finally {
     aguardar.value.fechar();
  }

};


</script>

<style scoped>

</style>
