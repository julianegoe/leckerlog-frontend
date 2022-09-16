<script lang="ts" setup>
import { FilterItem } from '../types/types';
import AppHeader from '../components/AppHeader.vue';
import AppEmptyState from '../components/AppEmptyState.vue';
import AppBadge from '../components/globals/AppBadge.vue';
import { useContentStore } from '../store/content';
import { useApi } from '../composables/useApi';
import { ref } from 'vue';
import { useSortingStore } from '../store/sorting';

const { cuisines } = useContentStore();
const { setGroupState, activeGroupBy } = useSortingStore();
const api = useApi();

const groupBy = ref<FilterItem[]>([
    {
        label: 'Küchen',
        value: 'cuisines',
    },
]);


const setGroupBy = (groupBy: FilterItem) => {
    setGroupState(groupBy);
}

</script>
<template>
    <div>
        <AppHeader>
            <div class="font-bold text-xl">LeckerLog</div>
        </AppHeader>
        <div class="flex flex-row px-2">
            <template v-for="(groupValue, index) in groupBy" :key="index + groupValue.label">
                <AppBadge @click="setGroupBy(groupValue)" :action-state="groupValue" :active-state="activeGroupBy" />
            </template>
        </div>
        <div v-if="cuisines.length > 0" class="grid gap-3 grid-cols-2 items-center justify-between m-2">
            <template v-for="(cuisine, index) in cuisines">
                <RouterLink :to="{ name: 'Food', params: { cuisine: cuisine.name } }">
                    <div class="flex items-center justify-center w-full aspect-square p-4 border border-black text-xl font-bold cursor-pointer active:bg-gray-200"
                        :key="index + '-cuiine'">{{ cuisine.name }}</div>
                </RouterLink>
            </template>
        </div>
        <AppEmptyState v-else-if="cuisines.length === 0" />
    </div>
</template>