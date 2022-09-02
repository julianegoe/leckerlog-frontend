<script lang="ts" setup>
import { createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';
import { ref } from 'vue';
import AppTextInput from '../components/AppTextInput.vue';
import { useAuthentication } from '../composables/useAuthentication';
import { auth } from '../firebase/firebase';

const { signIn } = useAuthentication();

const email = ref('');
const password = ref('');

const handleRegister = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value).then((response) => {
    if (response.user) {
      console.log('registered');
    }
  })
};
</script>
<template>
  <h1 class="text-2xl font-bold text-center mb-4">Leckerlog!</h1>
  <div class="flex flex-col items-center gap-4">
    <h1>Registrieren</h1>
    <form @submit.prevent="handleRegister">
      <AppTextInput v-model="email" label="Email" id="email" type="text" />
      <AppTextInput v-model="password" label="Passwort" id="password" type="password" />
      <button class="border border-1 border-black p-2 mt-4" type="submit">Register</button>
    </form>
    <h1>Login</h1>
    <form @submit.prevent="signIn(email, password)">
      <AppTextInput v-model="email" label="Email" id="email" type="text" />
      <AppTextInput v-model="password" label="Passwort" id="password" type="password" />
      <button class="border border-1 border-black p-2 mt-4" type="submit">Login</button>
      </form>
  </div>
</template>