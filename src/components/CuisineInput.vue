<script lang="ts" setup>
import {computed, ref} from 'vue';
import { useFetch } from '@vueuse/core';
import {Cuisine, ListItem} from '../types/types';

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: ListItem;
}>();

const { data, error } = useFetch(`${import.meta.env.VITE_BASE_API_URL}/cuisines`).get().json();
const cuisines = computed<Cuisine[]>(() => data.value);
const searchQuery = ref(props.modelValue.label);
const isOpen = ref(false);

const selectableCuisines = computed<ListItem[]>(() => {
    return cuisines.value.filter((cuisine: Cuisine) => {
        return cuisine.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    }).map((cuisine: Cuisine) => ({
        value: cuisine.cuisine_id,
        label: cuisine.name,
    }))
})

const handleSelection = (cuisine: ListItem) => {
    searchQuery.value = cuisine.label;
    emit('update:modelValue', cuisine)
    isOpen.value = false;
}

</script>
<template>
    <div class="py-2">
        <label class="relative -bottom-3 left-4 px-1 bg-white text-sm" for="cuisine-input">Küche</label>
        <input @focus="isOpen = true" autocomplete="off" v-model="searchQuery" id="cuisine-input" name="cuisine-input"
            class="py-2 px-4 border border-black w-full" type="text" placeholder="nach Küchen suchen" />
        <div class="z-100" v-if="isOpen" v-click-outside="() => { isOpen = false }">
            <ul class="border border-black overflow-y-scroll max-h-40">
                <li v-for="cuisine in selectableCuisines" :key="cuisine.value"
                    class="cursor-pointer hover:bg-gray-200 p-2" @click="handleSelection(cuisine)">
                    <div>{{ cuisine.label }}</div>
                </li>
            </ul>
            <div v-if="error">{{ error }}</div>
        </div>
    </div>
</template>
