<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppTextInput from '../components/AppTextInput.vue';
import router from '../router';

const router = useRouter()

const email = ref('user');
const password = ref('password');

function routeToHome() {
  router.push({name: 'Home'})
}

</script>
<template>
  <div>
    <h1 class="text-2xl font-bold text-center mb-4">Leckerlog!</h1>
    <div class="flex flex-col justfy-between items-center gap-4">
      <img class="w-3/4 aspect-square" src="../assets/logo.png" alt="Leckerlog logo" />
      <div class="flex flex-col justify-center items-center">
        <h1>Login</h1>
        <form>
          <AppTextInput v-model="email" label="Email" id="email" type="text" />
          <AppTextInput v-model="password" label="Passwort" id="password" type="password" />
          <button class="w-full flex justify-center mt-4 p-2 border border-black active:bg-gray-200" type="submit">
            <div @click="routeToHome">Login</div>
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