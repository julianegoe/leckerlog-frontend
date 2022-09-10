import { defineStore } from 'pinia'
import { ref } from 'vue';
import { Cuisine, Leckerlog } from '../types/types';

export const useContentStore = defineStore('content', () => {
    const cuisines = ref<Cuisine[]>([]);
    const leckerlogs = ref<Leckerlog[]>([])

    function setCuisines(cuisinesData: Cuisine[]) {
        cuisines.value = cuisinesData
    }

    function setLeckerlogs (leckerlogdata: Leckerlog[]) {
        leckerlogs.value = leckerlogdata
    }

    return { cuisines, leckerlogs, setCuisines, setLeckerlogs }
})