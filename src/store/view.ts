import { defineStore } from 'pinia'
import { ref } from 'vue';
import { FilterItem } from '../types/types';

export const useViewStore = defineStore('view', () => {

    const active = ref<FilterItem>({
        label: 'Küchen',
        value: 'cuisines',
    });

    function set (view: FilterItem) {
        active.value = view;
    }

    return { active, set }
})