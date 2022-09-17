<script lang="ts" setup>
import AppEmptyState from '../../components/AppEmptyState.vue';
import { useContentStore } from '../../store/content';

const { cuisines } = useContentStore();

</script>
<template>
    <div v-if="cuisines.length > 0" class="grid gap-6 grid-cols-2 items-center justify-between m-2">
        <template v-for="(cuisine, index) in cuisines">
            <RouterLink :to="{ name: 'Food', params: { cuisine: cuisine.name } }">
                <div class="flex items-center justify-center p-4 w-full aspect-square border-2 border-black rounded-md shadow-brutal text-xl font-bold cursor-pointer hover:bg-primary-purple"
                    :key="index + '-cuiine'">{{ cuisine.name }}</div>
            </RouterLink>
        </template>
    </div>
    <AppEmptyState v-else-if="cuisines.length === 0" />

</template>