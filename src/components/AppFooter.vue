<script lang="ts" setup>
import { ref } from 'vue';

const isUploading = ref(false);
</script>
<template>
<footer class="w-full h-20 bg-gray-200 flex justify-around items-center">
    <router-link :to="{name: 'AddFood'}">
        <button :disabled="isUploading" class="p-2 cursor-pointer"
                :class="{
                  'disabled:text-gray-500 disabled:cursor-default' : isUploading,
                }">Hinzufügen</button>
    </router-link>
    <router-link :to="{name: 'Home'}">
        <button :disabled="isUploading" class="p-2 cursor-pointer"
        :class="{
          'disabled:text-gray-500 disabled:cursor-default' : isUploading,
        }">Liste</button>
    </router-link>
</footer>
</template>
