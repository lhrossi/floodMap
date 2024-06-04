<script setup lang="ts">
import axios from 'axios';
import { useChallengeV2 } from 'vue-recaptcha';

const { root, onVerify } = useChallengeV2({
  options: {
    theme: 'light',
    size: 'normal',
  },
});

onVerify((response) => {
  if (response)
    isCaptchaVerified.value = true;
});
const formData = ref({
  name: '',
  lastName: '',
  institute: '',
  city: '',
  state: '',
  whatsapp: '',
  email: '',
  message: '',
});

const isCaptchaVerified = ref(false);
const requestUrl = '/api/contact';

async function submitForm() {
  if (!isCaptchaVerified.value) {
    // eslint-disable-next-line no-alert
    alert('Por favor, complete o reCAPTCHA.');
    return;
  }
  try {
    await $fetch(requestUrl, {
      method: 'post',
      body: formData.value,
    });

    formData.value = {
      name: '',
      lastName: '',
      institute: '',
      city: '',
      state: '',
      whatsapp: '',
      email: '',
      message: '',
    };

    // eslint-disable-next-line no-alert
    alert('Formulário enviado!');
  }
  catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}
</script>

<template>
  <form
    class="max-w-xl mx-auto"
    @submit.prevent="submitForm"
  >
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full group">
        <label
          for="name"
          class="block mb-2"
        >
          <span>Nome</span>

          <span class="ml-1 text-gray-400">(obrigatório)</span>
        </label>

        <input
          id="name"
          v-model="formData.name"
          type="text"
          name="name"
          class="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
          placeholder="Digite o seu nome..."
          required
        >
      </div>

      <div class="relative z-0 w-full group">
        <label
          for="last_name"
          class="block mb-2"
        >
          <span>Sobrenome</span>

          <span class="ml-1 text-gray-400">(obrigatório)</span></label>

        <input
          id="last_name"
          v-model="formData.lastName"
          type="text"
          name="last_name"
          class="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
          placeholder="Digite o seu sobrenome..."
          required
        >
      </div>
    </div>

    <div class="relative z-0 w-full group mb-5">
      <label
        for="institute"
        class="block mb-2"
      >
        <span>Instituição</span>

        <span class="ml-1 text-gray-400">(obrigatório)</span>
      </label>

      <input
        id="institute"
        v-model="formData.institute"
        type="text"
        name="institute"
        class="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5 "
        placeholder="Digite a instituição que você trabalha..."
        required
      >
    </div>

    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full group">
        <label
          for="city"
          class="block mb-2"
        >
          <span>Cidade</span>

          <span class="ml-1 text-gray-400">(obrigatório)</span>
        </label>

        <input
          id="city"
          v-model="formData.city"
          type="text"
          name="city"
          class="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
          placeholder="Digite a sua cidade..."
          required
        >
      </div>

      <div class="relative z-0 w-full group">
        <label
          for="state"
          class="block mb-2"
        >
          <span>Estado</span>

          <span class="ml-1 text-gray-400">(obrigatório)</span></label>

        <input
          id="state"
          v-model="formData.state"
          type="text"
          name="state"
          class="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
          placeholder="Digite o seu estado..."
          required
        >
      </div>
    </div>

    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full group">
        <label
          for="whatsapp"
          class="block mb-2"
        >
          <span>Whatsapp</span>

          <span class="ml-1 text-gray-400">(obrigatório)</span>
        </label>

        <input
          id="whatsapp"
          v-model="formData.whatsapp"
          type="text"
          name="whatsapp"
          class="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
          placeholder="Digite o seu whatsapp..."
          required
        >
      </div>

      <div class="relative z-0 w-full group">
        <label
          for="email"
          class="block mb-2"
        >
          <span>Email</span>

          <span class="ml-1 text-gray-400">(obrigatório)</span></label>

        <input
          id="email"
          v-model="formData.email"
          type="email"
          name="email"
          class="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
          placeholder="Digite o seu email..."
          required
        >
      </div>
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <label
        for="message"
        class="block mb-2 text-sm"
      >
        <span>Mensagem</span>

        <span class="ml-1 text-gray-400">(obrigatório)</span>
      </label>

      <textarea
        id="message"
        v-model="formData.message"
        rows="4"
        class="block p-2.5 w-full text-sm rounded-lg border border-gray-300 "
        placeholder="Leave a comment..."
        required
      />
    </div>

    <div
      ref="root"
      class="flex items-center justify-center mb-5"
    />

    <div class="flex justify-center">
      <button
        type="submit"
        class="text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        ENVIAR
      </button>
    </div>
  </form>
</template>

<style lang="scss">
</style>
