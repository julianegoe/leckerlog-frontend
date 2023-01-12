<script lang="ts" setup>
import AppTextInput from '../components/AppTextInput.vue';
import { ref } from 'vue';

const email = ref('');
const password = ref('');

</script>
<template>
  <div class="flex flex-col justfy-between items-center gap-4">
    <h1>Registrieren</h1>
    <form autocomplete="off">
      <AppTextInput v-model="email" label="Email" id="email" type="text" />
      <AppTextInput v-model="password" label="Passwort" id="password" type="password" />
      <button class="w-full border border-1 border-black p-2 mt-4" type="submit">Registrieren</button>
      <RouterLink :to="{name: 'Login'}">
        <button class="w-full border border-1 border-black p-2 mt-4" type="submit">Login</button>
      </RouterLink>
    </form>
  </div>
</template>