<script lang="ts" setup>
import AppTextInput from '../components/AppTextInput.vue';
import { ref } from 'vue';
import { useUiStore } from '../store/ui';
import { useRouter } from 'vue-router';
import { ValidatorResponse } from '../types/api-types';
import UiBackground from '../components/globals/UiBackground.vue';

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
  <UiBackground>
    <div class="flex flex-col justfy-end items-center gap-4">
      <h1 class="text-xl font-bold">Registrieren</h1>
      <form @submit.prevent="register" autocomplete="off">
        <AppTextInput v-model="email" label="Email" id="email" type="text" :server-errors="emailErrors" />
        <AppTextInput v-model="password" label="Passwort" id="password" type="password"
          :server-errors="passwordErrors" />
        <button class="w-full border border-1 border-black hover:bg-black hover:text-white p-2 mt-4" type="submit">Registrieren</button>
        <RouterLink :to="{ name: 'Login' }">
          <button class="w-full text-md font-bold mt-4" type="submit">Zum Einloggen</button>
        </RouterLink>
      </form>
    </div>
  </UiBackground>
</template>