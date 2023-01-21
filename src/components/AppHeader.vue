<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import SearchIcon from '../assets/icons/search.svg?component'
import { useRouter } from 'vue-router';
import { useUiStore } from '../store/ui';

const router = useRouter();
const ui = useUiStore()

const logout = () => {
  localStorage.removeItem('auth');
  localStorage.removeItem("user");
  router.push({ name: 'Login'});
  ui.openSnackBar('Logout erfolgreich.');

}

</script>
<template>
  <header class="flex justify-between items-center p-2">
    <slot></slot>
    <!--    right side-->
    <div class="flex items-center justify-between gap-4">
      <RouterLink v-if="router.currentRoute.value.name !== 'Search'" :to="{name: 'Search'}">
        <div>
          <SearchIcon />
        </div>
      </RouterLink>
      <button @click="logout" class="px-2 border border-black cursor-pointer">Logout</button>
    </div>
  </header>
</template>
