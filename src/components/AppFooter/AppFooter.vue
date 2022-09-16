<script lang="ts" setup>
import { ref } from 'vue';
import Plus from '../../assets/icons/plus.svg';
import Squares from '../../assets/icons/squares.svg';
import List from '../../assets/icons/list.svg';

const isUploading = ref(false);
</script>
<template>
  <footer id="bottom-nav"
    class="fixed bottom-0 w-full bg-gray-200 flex justify-start items-center border border-1 border-black">
    <router-link :to="{name: 'AddFood'}">
      <button :disabled="isUploading"
        id="add-button"
        class="w-24 border-r border-black cursor-pointer grow-1 flex flex-col items-center justify-center hover:bg-gray-400 pt-2 pb-4"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
        }">
        <Plus />
        <div class="text-xs">Hinzufügen</div>
      </button>
    </router-link>
    <router-link :to="{name: 'Home'}">
      <button :disabled="isUploading" id="list-button"
        class="w-24 border-r border-black cursor-pointer grow-1 flex flex-col items-center justify-center hover:bg-gray-400 pt-2 pb-4"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
        }">
        <List />
        <div class="text-xs">Liste</div>
      </button>
    </router-link>
    <router-link :to="{name: 'Categories'}">
      <button :disabled="isUploading" id="categories-button"
        class="w-24 border-r border-black cursor-pointer grow-1 flex flex-col items-center justify-center hover:bg-gray-400 pt-2 pb-4"
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
/* #add-button,
#list-button,
#categories-button {
  padding-bottom: env(safe-area-inset-bottom) / 2;
} */
</style>

