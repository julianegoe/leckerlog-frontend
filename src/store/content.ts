import { defineStore } from 'pinia'
import { ref } from 'vue';
import { Cuisine, FoodOrdered, LastUpdatedFood, Leckerlog } from '../types/types';

export const useContentStore = defineStore('content', () => {
    const cuisines = ref<Cuisine[]>([]);
    const leckerlogs = ref<Leckerlog[]>([])

    function setCuisines(cuisinesData: Cuisine[]) {
        cuisines.value = cuisinesData
    }

    function setLeckerlogs (leckerlogdata: Leckerlog[]) {
        leckerlogs.value = leckerlogdata
    }

    function getLastUpdated () {
        const foods = [...leckerlogs.value].map((log: Leckerlog) => {
            return log.food_ordered.map((food: FoodOrdered) => {
                return {
                    ...food,
                    restaurant_name: log.name,
                }
            })
        });
        return foods.flat().sort((a: LastUpdatedFood, b: LastUpdatedFood) => {
            if (new Date(a.ordered_at) > new Date(b.ordered_at)) {
                return 1;
            }
            if (new Date(a.ordered_at) < new Date(b.ordered_at)) {
                return -1;
            }
            if (new Date(a.ordered_at) === new Date(b.ordered_at)) {
                return 0;
            }
            return 0
        }).reverse();
    }

    return { cuisines, leckerlogs, setCuisines, setLeckerlogs, getLastUpdated }
})