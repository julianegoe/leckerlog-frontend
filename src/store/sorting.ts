import { defineStore } from 'pinia'
import { ref, toRefs } from 'vue';
import { FilterItem } from '../types/types';

export const useSortingStore = defineStore('sorting', () => {

    const activeSortBy = ref<FilterItem>({
        label: 'Zuletzt bestellt',
        value: 'last_ordered',
    });

    const activeGroupBy = ref<FilterItem>({
        label: 'Küchen',
        value: 'cuisines'
    })

    function setSortingState(sortBy: FilterItem) {
        activeSortBy.value = sortBy;
    }

    function setGroupState(sortBy: FilterItem) {
        activeGroupBy.value = sortBy;
    }

    return {
        activeSortBy,
        activeGroupBy,
        setSortingState,
        setGroupState
    }
})