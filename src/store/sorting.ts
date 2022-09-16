import { defineStore } from 'pinia'
import { ref } from 'vue';
import { FilterItem } from '../types/types';

export const useSortingStore = defineStore('sorting', () => {

    const activeSortBy = ref<FilterItem>({
        label: 'Zuletzt bestellt',
        value: 'last_ordered',
    });

    function set (sortBy: FilterItem) {
        activeSortBy.value = sortBy;
    }

    return { activeSortBy, set }
})