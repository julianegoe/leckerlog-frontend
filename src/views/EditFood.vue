<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import CancelIcon from '../assets/icons/cancel.svg?component'
import AppStarRatingInput from "../components/AppStarRatingInput.vue";
import AppTextarea from "../components/AppTextarea.vue";
import ChipInput from "../components/ChipInput.vue";
import CuisineInput from "../components/CuisineInput.vue";
import AppTextInput from "../components/AppTextInput.vue";
import { reactive, ref } from "vue";
import { useApi } from "../composables/useApi";
import { useContentStore } from "../store/content";
import { useRouter, RouterLink } from "vue-router";

const api = useApi();
const router = useRouter();
const { currentFoodOrdered } = useContentStore()

const loading = ref(false);

const inputValues = reactive<any>({
    restaurantName: currentFoodOrdered?.name,
    foodName: currentFoodOrdered?.food_ordered[0].name || '',
    cuisine: {
        value: currentFoodOrdered?.cuisine_id || 0,
        label: '',
    },
    rating: currentFoodOrdered?.food_ordered[0].rating || 0,
    comment: currentFoodOrdered?.food_ordered[0].comment || '',
    tags: currentFoodOrdered?.food_ordered[0].tags || [],
})

const updateFood = async () => {
    loading.value = true;
    if (currentFoodOrdered?.food_ordered[0].food_id) {
        await api.updateFoodOrdered(currentFoodOrdered?.food_ordered[0].food_id, inputValues);
    }
    loading.value = false;
    await router.push({ name: 'Details', params: { foodId: currentFoodOrdered?.food_ordered[0].food_id } });

};

</script>
<template>
    <div>
        <div class="p-4 flex justify-between text-md font-bold bg-primary-red border border-b-2 border-black">
            <span>{{ currentFoodOrdered?.name }} bearbeiten</span>
            <RouterLink :to="{ name: 'Details', params: { foodId: currentFoodOrdered?.food_ordered[0].food_id } }">
                <CancelIcon />
            </RouterLink>
        </div>
        <div class="p-4">
            <div class="text-sm">
                <form @submit.prevent="updateFood">
                    <AppTextInput v-model="inputValues.foodName" id="foodName" label="Gericht" type="text" />
                    <CuisineInput v-model="inputValues.cuisine" />
                    <AppTextarea v-model="inputValues.comment" label="Kommentar" id="comment-input" type="text" />
                    <ChipInput label="Tags" id="tag-input" v-model="inputValues.tags" />
                    <AppStarRatingInput v-model="inputValues.rating" />
                </form>
            </div>
            <button class="font-bold mr-2" @click="updateFood" type="submit">Ändern</button>
            <RouterLink :to="{ name: 'Details', params: { foodId: currentFoodOrdered?.food_ordered[0].food_id } }">
                <button class="font-bold" @click="$emit('close', false)">Abbrechen</button>
            </RouterLink>
        </div>
    </div>
</template>