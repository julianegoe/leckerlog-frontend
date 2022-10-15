<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import { ref } from 'vue';
import Plus from '../../assets/icons/plus.svg?component';
import Squares from '../../assets/icons/squares.svg?component';
import List from '../../assets/icons/list.svg?component';
import Chart from '../../assets/icons/chart.svg?component';
import { useRouter } from 'vue-router';

const router = useRouter();

const isUploading = ref(false);
const isActive = (name: string) => {
  return router.currentRoute.value.name === name
};
</script>
<template>
  <footer id="bottom-nav"
    class="fixed bottom-0 w-full bg-black flex justify-start items-center ">
    <router-link :to="{name: 'AddFood'}">
      <button :disabled="isUploading" id="list-button"
        class="group text-primary-red w-24 cursor-pointer grow-1 flex flex-col items-center justify-center pt-2"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
          'border-t-4 border-primary-red' : isActive('AddFood'),
        }">
        <Plus class="group-hover:transition-transform group-hover:scale-125 group-hover:ease-in" />
        <div class="text-xs pt-1">Hinzufügen</div>
      </button>
    </router-link>
    <router-link :to="{name: 'Home'}">
      <button :disabled="isUploading" id="list-button"
        class="group text-primary-green  w-24 cursor-pointer grow-1 flex flex-col items-center justify-center pt-2"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
          'border-t-4 border-primary-green' : isActive('Home'),
        }">
        <List class="group-hover:transition-transform group-hover:scale-125 group-hover:ease-in" />
        <div class="text-xs pt-1">Liste</div>
      </button>
    </router-link>
    <router-link :to="{name: 'Categories'}">
      <button :disabled="isUploading" id="categories-button"
        class="group text-primary-purple  w-24  cursor-pointer grow-1 flex flex-col items-center justify-center pt-2"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
          'border-t-4 border-primary-purple' : isActive('Categories'),
        }">
        <Squares class="group-hover:transition-transform group-hover:scale-125 group-hover:ease-in" />
        <div class="text-xs pt-1">Kategorien</div>
      </button>
    </router-link>
    <router-link :to="{name: 'Stats'}">
      <button :disabled="isUploading" id="categories-button"
        class="group text-primary-blue w-24 cursor-pointer grow-1 flex flex-col items-center justify-center pt-2"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
          'border-t-4 border-primary-blue' : isActive('Stats'),
        }">
        <Chart class="group-hover:transition-transform group-hover:scale-125 group-hover:ease-in" />
        <div class="text-xs pt-1">Statistik</div>
      </button>
    </router-link>
  </footer>
</template>
<style scoped>
  #add-button, #list-button, #categories-button {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>

