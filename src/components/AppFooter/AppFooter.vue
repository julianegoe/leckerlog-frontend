<script lang="ts" setup>
import { ref } from 'vue';
import AddButton from './AddButton.vue';
import Squares from '../../assets/icons/squares.svg';
import List from '../../assets/icons/list.svg';

const isUploading = ref(false);
</script>
<template>
  <footer id="bottom-nav" class="fixed bottom-0 w-full bg-gray-200 flex justify-start items-center border border-1 border-black">
    <router-link :to="{name: 'AddFood'}">
      <AddButton :is-uploading="isUploading" />
    </router-link>
    <router-link :to="{name: 'Home'}">
      <button :disabled="isUploading"
        class="w-24 h-16 border-r border-black cursor-pointer grow-1 flex flex-col items-center justify-center hover:bg-gray-400"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
        }">
        <List />
        <div class="text-xs">Liste</div>
      </button>
    </router-link>
    <router-link :to="{name: 'Categories'}">
      <button :disabled="isUploading"
        class="w-24 h-16 border-r border-black cursor-pointer grow-1 flex flex-col items-center justify-center hover:bg-gray-400"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
        }">
        <Squares />
        <div class="text-xs">Kategorien</div>
      </button>
    </router-link>
  </footer>
</template>
<style scroped>
 /*  #bottom-nav {
    padding-bottom: env(safe-area-inset-bottom);
  } */
</style>

