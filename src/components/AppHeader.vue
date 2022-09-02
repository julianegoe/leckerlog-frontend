<script lang="ts" setup>
import { watch } from 'vue';
import { useAuthentication } from '../composables/useAuthentication';
import router from '../router';

const { signOut, error } = useAuthentication();

</script>
<template>
  <header class="flex justify-between items-center p-2">
    <slot></slot>
<!--    right side-->
    <div class="flex items-center justify-between gap-4">
      <button class="px-2 border border-black cursor-pointer" @click="signOut">Logout</button>
    </div>
  </header>
</template>
