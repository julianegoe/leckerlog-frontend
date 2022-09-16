import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import { Cuisine, FoodOrdered, LastUpdatedFood, Leckerlog } from '../types/types';
import { useSortingStore } from './sorting';

export const useContentStore = defineStore('content', () => {
    const sorting = useSortingStore();
    const cuisines = ref<Cuisine[]>([]);
    const leckerlogs = ref<Leckerlog[]>([])

    function setCuisines(cuisinesData: Cuisine[]) {
        cuisines.value = cuisinesData
    }

    function setLeckerlogs(leckerlogdata: Leckerlog[]) {
        leckerlogs.value = leckerlogdata
    }

    const getSortedFoodOrdered = computed(() => {
        const foods = [...leckerlogs.value].flatMap((log: Leckerlog) => {
            if (log.food_ordered !== null) {
                return log.food_ordered.map((food: FoodOrdered) => {
                    return [{
                        ...food,
                        restaurant_name: log.name,
                    }]
                });
            } else return []
        });
        switch (sorting.activeSortBy.value) {
            case 'last_ordered':
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
            case 'best_rated':
                return foods.flat().sort((a: LastUpdatedFood, b: LastUpdatedFood) => {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (a.rating < b.rating) {
                        return -1;
                    }
                    if (a.rating === b.rating) {
                        return 0;
                    }
                    return 0
                }).reverse();
                case 'alphabetically_asc':
                return foods.flat().sort((a: LastUpdatedFood, b: LastUpdatedFood) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name === b.name) {
                        return 0;
                    }
                    return 0
                });
            default:
              return foods.flat();
          }
    });

    const getTags = computed<string[]>(() => {
        const tags = leckerlogs.value.flatMap((leckerlog: Leckerlog) => {
           if (leckerlog.food_ordered) {
            return leckerlog.food_ordered.flatMap((food) => {
                return food.tags ? food.tags : []
            });
           } else return [];
        });
        return Array.from(new Set(tags))
    })

    return { cuisines, leckerlogs, setCuisines, setLeckerlogs, getSortedFoodOrdered, getTags }
})