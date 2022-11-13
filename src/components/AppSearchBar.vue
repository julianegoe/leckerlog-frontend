<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: string,
}>()

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref(props.modelValue);

watch(searchQuery, () => {
    emit("update:modelValue", searchQuery.value)
})
</script>
<template>
    <div class="bg-primary-purple px-2 py-2">
        <div>
            <label class="relative -bottom-3 left-4 px-1 bg-white text-sm" for="search">Suche</label>
            <input v-model="searchQuery" id="search" name="search" autocomplete="off"
                class="py-2 px-4 border border-black w-full" type="text" placeholder="Suche" />
        </div>
    </div>
</template>