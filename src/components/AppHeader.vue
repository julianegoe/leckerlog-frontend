<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import SearchIcon from '../assets/icons/search.svg?component'
import { useAuthentication } from '../composables/useAuthentication';
import { useRoute } from 'vue-router';

const { signOut, error } = useAuthentication();
const route = useRoute();
</script>
<template>
  <header class="flex justify-between items-center p-2">
    <slot></slot>
    <!--    right side-->
    <div class="flex items-center justify-between gap-4">
      <RouterLink v-if="route.name !== 'Search'" :to="{name: 'Search'}">
        <div>
          <SearchIcon />
        </div>
      </RouterLink>
      <button class="px-2 border border-black cursor-pointer" @click="signOut">Logout</button>
    </div>
  </header>
</template>
