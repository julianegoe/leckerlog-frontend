<script lang="ts" setup>
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail } from '@firebase/auth';
import { ref } from 'vue';
import AppTextInput from '../components/AppTextInput.vue';
import { useAuthentication } from '../composables/useAuthentication';
import { auth } from '../firebase/firebase';

const { signIn, loginStatus } = useAuthentication();

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

const resetPassword = () => {
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      window.alert('Email zum Zurücksetzend es Passworts wrde versendet');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
</script>
<template>
  <div>
    <h1 class="text-2xl font-bold text-center mb-4">Leckerlog!</h1>
    <div class="flex flex-col items-center gap-4">
      <h1>Registrieren</h1>
      <form @submit.prevent="handleRegister" autocomplete="off">
        <AppTextInput v-model="email" label="Email" id="email" type="text" />
        <AppTextInput v-model="password" label="Passwort" id="password" type="password" />
        <button class="border border-1 border-black p-2 mt-4" type="submit">Register</button>
      </form>
      <h1>Login</h1>
      <form @submit.prevent="signIn(email, password)">
        <AppTextInput v-model="email" label="Email" id="email" type="text" />
        <AppTextInput v-model="password" label="Passwort" id="password" type="password" />
        <button class="flex justify-center mt-4 p-2 w-32 border border-black active:bg-gray-200" type="submit">
          <div v-if="loginStatus === 'IDLE' || 'SUCCESS'">Login</div>
          <div v-else-if="loginStatus === 'LOADING'"
            class="w-6 h-6 border-2 border-black border-solid rounded-full animate-spin border-t-transparent"></div>
        </button>
      </form>
      <div class="cursor-pointer" @click="resetPassword">Passwort vergessen</div>
    </div>
  </div>
</template>