<script lang="ts" setup>
import { Cuisine } from '../../types/types';
import AppEmptyState from '../../components/AppEmptyState.vue';

defineProps<{
    cuisines: Cuisine[];
    status: 'LOADING' | 'IDLE' | 'SUCCESS' | 'ERROR';
}>()

</script>
<template>
    <div>
        <div v-if="cuisines.length > 0" class="grid gap-3 grid-cols-2 items-center justify-between m-2">
            <template v-for="(cuisine, index) in cuisines">
                <RouterLink :to="{ name: 'Food', params: { cuisine: cuisine.name } }">
                    <div class="flex items-center justify-center w-full aspect-square p-4 border border-black text-xl font-bold cursor-pointer active:bg-gray-200"
                        :key="index + '-cuiine'">{{ cuisine.name }}</div>
                </RouterLink>
            </template>
        </div>
        <!-- Skeletons -->
        <div v-else-if="status === 'LOADING'" class="grid gap-3 grid-cols-2 items-center justify-between m-2">
            <div class="bg-gray-200 animate-pulse w-full aspect-square"></div>
            <div class="bg-gray-200 animate-pulse w-full aspect-square"></div>
            <div class="bg-gray-200 animate-pulse w-full aspect-square"></div>
            <div class="bg-gray-200 animate-pulse w-full aspect-square"></div>
        </div>
        <AppEmptyState v-else-if="status === 'SUCCESS' && cuisines.length === 0" />
    </div>
</template>