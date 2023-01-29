<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import AppButton from '../components/globals/AppButton.vue';
import CancelIcon from '../assets/icons/cancel.svg?component'
import AppStarRatingInput from "../components/AppStarRatingInput.vue";
import AppTextarea from "../components/AppTextarea.vue";
import ChipInput from "../components/ChipInput.vue";
import CuisineInput from "../components/CuisineInput.vue";
import AppTextInput from "../components/AppTextInput.vue";
import { onBeforeMount, ref } from "vue";
import { FoodOrderedExtended, ListItem } from '../types/types';
import { useStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
import Box from '../components/globals/Box.vue';

const props = defineProps<{
    foodId: string;
}>();

const router = useRouter();
const jwtToken = useStorage('auth', '', localStorage);

const isLoading = ref(true);
const food = ref<FoodOrderedExtended>();
const cuisine = ref<ListItem>({
    value: 0,
    label: '',
});

const path = `${import.meta.env.VITE_BASE_API_URL}/food/details/?foodId=${props.foodId}`;
onBeforeMount(async () => {
    try {
        const response = await fetch(path, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken.value}`,
            }
        });
        const json = await response.json();
        food.value = json;
        cuisine.value = {
            value: food.value?.cuisine_id ?? 1,
            label: food.value?.cuisine ?? '',
        }

        isLoading.value = false;
    } catch (err) {
        console.log(err)
    };
})

const updateFood = async () => {
    console.log(cuisine.value.value)
    const path = `/food/update/${props.foodId}`;
    try {
        const response: any = await fetch(path, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwtToken.value}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: food.value?.name ?? '',
                rating: food.value?.rating ?? 0,
                comment: food.value?.comment ?? '',
                cuisine_id: cuisine.value?.value ?? 1,
                tags: food.value?.tags ?? [],
                restaurantName: food.value?.restaurant_name ?? '',
            })
        });
        const data = await response.json();
        router.push({ name: 'Home' })
    } catch (error) {
        console.log(error)
    }
};

</script>
<template>
    <div>
        <div class="p-4 flex justify-between text-md font-bold bg-primary-red border border-b-2 border-black">
            <div class="line-clamp-1">{{ food?.name }} bearbeiten</div>
            <RouterLink :to="{ name: 'Details', params: { foodId } }">
                <CancelIcon />
            </RouterLink>
        </div>
        <div class="p-4">
            <div v-if="food" class="text-sm">
                <Box class="m-2">
                    <form @submit.prevent="updateFood">
                        <AppTextInput v-model="food.name" id="foodName" label="Gericht" type="text" />
                        <CuisineInput v-model="cuisine" />
                        <AppTextarea v-model="food.comment" label="Kommentar" id="comment-input" type="text" />
                        <ChipInput label="Tags" id="tag-input" v-model="food.tags" />
                        <AppStarRatingInput v-model="food.rating" />
                        <AppButton>Ändern</AppButton>
                    </form>
                </Box>

            </div>
        </div>
    </div>
</template>