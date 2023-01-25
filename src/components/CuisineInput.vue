<script lang="ts" setup>
import { useStorage } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';
import { Cuisine, ListItem } from '../types/types';

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
    modelValue: ListItem;
}>();

const jwtToken = useStorage('auth', '', localStorage);
const searchQuery = ref(props.modelValue.label);
const isOpen = ref(false);
const cuisines = ref<Cuisine[]>([])

onMounted(async () => {
    try {
        const res = await fetch(import.meta.env.VITE_BASE_API_URL + "/cuisines", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken.value}`,
            }
        });
        const json = await res.json();
        cuisines.value = json;
    } catch (err) {
        console.log(err)
    }
})

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
        <input @focus="isOpen = true" autocomplete="off" v-model="searchQuery" id="cuisine-input" name="cuisine-input"
            class="py-2 px-4 border-b-2 border-b-black w-full" type="text" placeholder="nach Küchen suchen" />
        <div class="z-100" v-if="isOpen" v-click-outside="() => { isOpen = false }">
            <ul class="border border-black overflow-y-scroll max-h-40">
                <li v-for="cuisine in selectableCuisines" :key="cuisine.value"
                    class="cursor-pointer hover:bg-gray-200 p-2" @click="handleSelection(cuisine)">
                    <div>{{ cuisine.label }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
