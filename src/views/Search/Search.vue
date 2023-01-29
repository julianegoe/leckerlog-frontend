<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import { computed, ref, Transition } from 'vue';
import { RouterLink } from 'vue-router';
import BackIcon from '../../assets/icons/chevron-left.svg?component';
import AppHeader from '../../components/AppHeader.vue';
import AppSearchBar from '../../components/AppSearchBar.vue';
import MiniFoodCard from '../../components/MiniFoodCard.vue';
import SearchPlacesMenu from '../../components/SearchPlacesMenu.vue';
import { Leckerlog } from '../../types/types';

const searchQuery = ref('');
const searchPlaces = ref('food')
const searchTags = ref<string[]>([]);

const queryUrl = computed(() => {
    const url = new URL( import.meta.env.VITE_BASE_API_URL);
    if (searchQuery.value) {
        const searchPhrases = searchQuery.value.split(' ');
        searchPhrases.forEach((word) => {
            url.searchParams.append(searchPlaces.value, word)
        });
    }
    if (searchTags.value.length) {
        searchPlaces.value = 'tag';
        searchTags.value.forEach((tag) => {
            url.searchParams.append('tag', tag)
        })
    }
    url.pathname = `${searchPlaces.value}`
    return url;
})

const searchResults = ref<Leckerlog[]>([]);

</script>
<template>
    <div>
        <AppHeader>
            <RouterLink :to="{ name: 'Home' }">
                <div class="cursor-pointer pr-2">
                    <BackIcon class="hover:transition-transform hover:scale-125 hover:ease-in" />
                </div>
            </RouterLink>
            <span class="font-bold">Suche</span>
        </AppHeader>
        <AppSearchBar v-model="searchQuery" />
        <Transition name="slide" mode="out-in">
            <SearchPlacesMenu v-show="searchQuery.length > 0" v-model="searchPlaces" />
        </Transition>
        <div class="p-2 mt-10">
            <template v-if="searchResults.length > 0">
                <div class="" v-for="result in searchResults" :key="result.restaurant_id + '-search'">
                    <div class="font-bold text-lg py-2">{{ result.name }}</div>
                    <div v-for="food in result.food_ordered" :key="food.food_id + '-search'">
                        <MiniFoodCard :food-ordered="food" />
                    </div>
                </div>
            </template>
            <div v-else>Keine Suchergebnisse</div>
        </div>
    </div>
</template>
<style scoped>
.slide-enter-active {
    transition: opacity 0.25s ease-out;
}

.slide-leave-active {
    transition: opacity 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0
}
</style>