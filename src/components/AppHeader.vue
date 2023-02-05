<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import SearchIcon from '../assets/icons/search.svg?component';
import AppButton from './globals/AppButton.vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../store/ui';

const router = useRouter();
const ui = useUiStore()

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  router.push({ name: 'Login'});
  ui.openSnackBar('Logout erfolgreich.');

}

</script>
<template>
  <header class="flex justify-between items-center p-2 bg-white border-b-2 border-b-black">
    <slot></slot>
    <!--    right side-->
    <div class="flex items-center justify-between gap-4">
      <RouterLink v-if="router.currentRoute.value.name !== 'Search'" :to="{name: 'Search'}">
        <div>
          <SearchIcon />
        </div>
      </RouterLink>
      <AppButton @click="logout">Logout</AppButton>
    </div>
  </header>
</template>
