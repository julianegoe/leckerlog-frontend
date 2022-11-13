<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: string,
}>()

const emit = defineEmits(['update:modelValue']);

const newQuery = ref();
const searchQueries = ref(props.modelValue);

/* const addSearchQuery = () => {
    searchQueries.value.push(newQuery.value)
}; */

watch(newQuery, () => {
    emit("update:modelValue", newQuery.value)
})
</script>
<template>
    <div class="bg-white">
        <div>
            <label class="relative -bottom-3 left-4 px-1 bg-white text-sm" for="search">Suche</label>
            <input v-model="newQuery" id="search"
                name="search" autocomplete="off" class="py-2 px-4 border border-black w-full" type="text"
                placeholder="Suche" />
        </div>
    </div>
</template>