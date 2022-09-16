<script lang="ts" setup>
import { Cuisine } from '../types/types';
import AppHeader from '../components/AppHeader.vue';
import AppEmptyState from '../components/AppEmptyState.vue';
import { useContentStore } from '../store/content';
import { useApi } from '../composables/useApi';

const { cuisines } = useContentStore();
const api = useApi();

</script>
<template>
    <div>
        <AppHeader>
            <div class="font-bold text-xl">LeckerLog</div>
        </AppHeader>
        <div v-if="cuisines.length > 0" class="grid gap-3 grid-cols-2 items-center justify-between m-2">
            <template v-for="(cuisine, index) in cuisines">
                <RouterLink :to="{ name: 'Food', params: { cuisine: cuisine.name } }">
                    <div class="flex items-center justify-center w-full aspect-square p-4 border border-black text-xl font-bold cursor-pointer active:bg-gray-200"
                        :key="index + '-cuiine'">{{ cuisine.name }}</div>
                </RouterLink>
            </template>
        </div>
        <!-- Skeletons -->
        <div v-else-if="api.status.value === 'LOADING'" class="grid gap-3 grid-cols-2 items-center justify-between m-2">
            <div class="bg-gray-200 animate-pulse w-full aspect-square"></div>
            <div class="bg-gray-200 animate-pulse w-full aspect-square"></div>
            <div class="bg-gray-200 animate-pulse w-full aspect-square"></div>
            <div class="bg-gray-200 animate-pulse w-full aspect-square"></div>
        </div>
        <AppEmptyState v-else-if="api.status.value === 'SUCCESS' && cuisines.length === 0" />
    </div>
</template>