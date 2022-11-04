<script lang="ts" setup>
import AppTextInput from '../components/AppTextInput.vue';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { ref } from 'vue';
import { auth } from '../firebase/firebase';

const email = ref('');
const password = ref('');

const handleRegister = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value).then(async (response) => {
    if (response.user) {
      window.alert('Du bist registriert.');
    }
  }).catch((error) => {
    if (error.code === 'auth/email-already-in-use') {
      window.alert('Nutzer schon vorhanden.')
    }
  })
};
</script>
<template>
  <div class="flex flex-col justfy-between items-center gap-4">
    <h1>Registrieren</h1>
    <form @submit.prevent="handleRegister" autocomplete="off">
      <AppTextInput v-model="email" label="Email" id="email" type="text" />
      <AppTextInput v-model="password" label="Passwort" id="password" type="password" />
      <button class="w-full border border-1 border-black p-2 mt-4" type="submit">Registrieren</button>
      <RouterLink :to="{name: 'Login'}">
        <button class="w-full border border-1 border-black p-2 mt-4" type="submit">Login</button>
      </RouterLink>
    </form>
  </div>
</template>