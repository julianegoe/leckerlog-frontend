<script lang="ts" setup>
import AppTextInput from '../components/AppTextInput.vue';
import { ref } from 'vue';
import { useUiStore } from '../store/ui';
import { useRouter } from 'vue-router';
import { ValidatorResponse } from '../types/api-types';
import AppButton from '../components/globals/AppButton.vue';
import Box from '../components/globals/Box.vue';

const ui = useUiStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const emailErrors = ref<string[]>([]);
const passwordErrors = ref<string[]>([]);

const register = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const data = await response.json()
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
    router.push({ name: 'Login' });
    ui.openSnackBar(data.value.message);
  } catch (error) {
    console.log(error)
  }
};

</script>
<template>
  <div class="flex flex-col justfy-end items-center gap-2 p-6">
    <Box class="m-2 w-full">
      <h1 class="text-xl font-bold py-2">Hol' dir dein Leckerlog Konto</h1>
      <form class="w-full" @submit.prevent="register" autocomplete="off">
        <AppTextInput v-model="email" label="Email" id="email" type="text" :server-errors="emailErrors" />
        <AppTextInput v-model="password" label="Passwort" id="password" type="password"
          :server-errors="passwordErrors" />
        <AppButton class="w-full">Registrieren</AppButton>
      </form>
    </Box>
    <RouterLink :to="{ name: 'Login' }">
      <button class="w-full text-md font-bold" type="submit">Zum Einloggen</button>
    </RouterLink>
  </div>
</template>