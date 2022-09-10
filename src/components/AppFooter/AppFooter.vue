<script lang="ts" setup>
import { ref } from 'vue';
import AddButton from './AddButton.vue';
import Building from '../../assets/icons/building.svg';

const isUploading = ref(false);
</script>
<template>
    <footer class="w-full h-16 bg-gray-200 flex justify-start items-center  border border-1 border-black">
    <router-link :to="{name: 'AddFood'}">
        <AddButton :is-uploading="isUploading"  />
    </router-link>
    <router-link :to="{name: 'Home'}">
        <button :disabled="isUploading" class="px-8 h-16 border-r border-black cursor-pointer grow-1 flex flex-col items-center justify-center hover:bg-gray-400"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
        }">
        <Building />
        <div class="text-xs">Essen</div>
        </button>
    </router-link>
</footer>
</template>
