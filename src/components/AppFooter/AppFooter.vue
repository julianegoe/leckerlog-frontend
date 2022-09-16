<script lang="ts" setup>
import { ref } from 'vue';
import Plus from '../../assets/icons/plus.svg';
import Squares from '../../assets/icons/squares.svg';
import List from '../../assets/icons/list.svg';

const isUploading = ref(false);
</script>
<template>
  <footer id="bottom-nav"
    class="fixed bottom-0 w-full bg-blue-200 flex justify-start items-center ">
    <router-link :to="{name: 'AddFood'}">
      <button :disabled="isUploading" id="list-button"
        class="group w-24 cursor-pointer grow-1 flex flex-col items-center justify-center pt-2"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
        }">
        <Plus class="group-hover:transition-transform group-hover:scale-150 group-hover:ease-in" />
        <div class="text-xs">Hinzufügen</div>
      </button>
    </router-link>
    <router-link :to="{name: 'Home'}">
      <button :disabled="isUploading" id="list-button"
        class="group w-24 cursor-pointer grow-1 flex flex-col items-center justify-center pt-2"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
        }">
        <List class="group-hover:transition-transform group-hover:scale-150 group-hover:ease-in" />
        <div class="text-xs">Liste</div>
      </button>
    </router-link>
    <router-link :to="{name: 'Categories'}">
      <button :disabled="isUploading" id="categories-button"
        class="group w-24  cursor-pointer grow-1 flex flex-col items-center justify-center pt-2"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
        }">
        <Squares class="group-hover:transition-transform group-hover:scale-150 group-hover:ease-in" />
        <div class="text-xs">Kategorien</div>
      </button>
    </router-link>
  </footer>
</template>
<style scoped>
  #add-button, #list-button, #categories-button {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>

