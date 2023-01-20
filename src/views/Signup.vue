<script lang="ts" setup>
import AppTextInput from '../components/AppTextInput.vue';
import { ref } from 'vue';
import { useFetch } from '@vueuse/core';

const email = ref('');
const password = ref('');

const register = () => {
  const { data } = useFetch(`${import.meta.env.VITE_BASE_API_URL}/register`).post({
    email: email.value, 
    password: password.value,
  }).json()
  console.log(data.value);
};

</script>
<template>
  <div class="flex flex-col justfy-between items-center gap-4">
    <h1>Registrieren</h1>
    <form @submit.prevent="register" autocomplete="off">
      <AppTextInput v-model="email" label="Email" id="email" type="text" />
      <AppTextInput v-model="password" label="Passwort" id="password" type="password" />
      <button class="w-full border border-1 border-black p-2 mt-4" type="submit">Registrieren</button>
      <RouterLink :to="{name: 'Login'}">
        <button class="w-full border border-1 border-black p-2 mt-4" type="submit">Login</button>
      </RouterLink>
    </form>
  </div>
</template>