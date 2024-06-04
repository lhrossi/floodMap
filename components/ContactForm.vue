<script setup lang="ts">
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

function generateMailtoLink(formData: any) {
  const subject = encodeURIComponent('AbrigosRS - Formulário de Contato');
  const body = encodeURIComponent(`
        Nome: ${formData.name}
        Sobrenome: ${formData.lastName}
        Instituição: ${formData.institute}
        Cidade: ${formData.city}
        Estado: ${formData.state}
        WhatsApp: ${formData.whatsapp}
        E-mail: ${formData.email}
        Mensagem: ${formData.message}
      `);

  return `mailto:abrigos.org@gmail.com?subject=${subject}&body=${body}`;
}

async function submitForm() {
  try {
    const mailtoLink = generateMailtoLink(formData.value);
    window.location.href = mailtoLink;

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
