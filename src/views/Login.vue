<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppTextInput from '../components/AppTextInput.vue';
import { useUiStore } from '../store/ui';
import { ValidatorResponse } from '../types/api-types';

const router = useRouter();
const ui = useUiStore()

const email = ref('');
const password = ref('');
const emailErrors = ref<string[]>([]);
const passwordErrors = ref<string[]>([]);

async function login() {
  const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    })
  });
  const data = await response.json();
  if (response.status === 400) {
    console.log(400, data)
    emailErrors.value = data.errors.filter((error: ValidatorResponse) => error.param === 'email').map((error: ValidatorResponse) => error.msg);
    passwordErrors.value = data.errors.filter((error: ValidatorResponse) => error.param === 'password').map((error: ValidatorResponse) => error.msg);
    return;
  }
  if (response.status === 401) {
    console.log(401, data)
    ui.openSnackBar(data.info);
    return;
  }
  if (data.token) {
    localStorage.setItem('auth', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  router.push({ name: 'Home' });
  ui.openSnackBar(data.message);
}

</script>
<template>
  <div>
    <h1 class="text-2xl font-bold text-center mb-4">Leckerlog!</h1>
    <div class="flex flex-col justfy-between items-center gap-4">
      <img class="w-3/4 aspect-square" src="../assets/logo.png" alt="Leckerlog logo" />
      <div class="flex flex-col justify-center items-center">
        <h1>Login</h1>
        <form @submit.prevent="login" autocomplete="off">
          <AppTextInput v-model="email" label="Email" id="email" type="text" :server-errors="emailErrors" />
          <AppTextInput v-model="password" label="Passwort" id="password" type="password"
            :server-errors="passwordErrors" />
          <button class="w-full flex justify-center mt-4 p-2 border border-black active:bg-gray-200" type="submit">
            <div>Einloggen</div>
          </button>
        </form>
        <div class="mt-4 cursor-pointer">Passwort vergessen</div>
        <RouterLink class="w-full" :to="{ name: 'Signup' }">
          <div class="w-full flex justify-center mt-4 p-2 border border-black active:bg-gray-200">Registrieren</div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>