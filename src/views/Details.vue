<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import AppHeader from "../components/AppHeader.vue";
import BackIcon from '../assets/icons/chevron-left.svg?component';
import StarIcon from '../assets/icons/star-outline.svg?component'
import TrashIcon from '../assets/icons/trash.svg?component';
import EditIcon from '../assets/icons/edit.svg?component';
import AppModal from '../components/modals/AppModal.vue';
import { computed, onMounted, ref, watchEffect } from "vue";
import { useContentStore } from "../store/content";
import TagBoxVue from "../components/globals/TagBox.vue";
import { useRouter } from "vue-router";
import { useApi } from "../composables/useApi";
import { useStorage } from "@vueuse/core";
import { FoodOrderedExtended } from "../types/types";

const router = useRouter();
const api = useApi();

const jwtToken = useStorage('auth', '', localStorage);

const props = defineProps<{
    foodId: string;
}>();

const imageUrl = ref('');
const isLoading = ref(true);

const food = ref<FoodOrderedExtended>();
const path = `${import.meta.env.VITE_BASE_API_URL}/food/details/?foodId=${props.foodId}`;
onMounted(async () => {
    try {
        const response = await fetch(path, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken.value}`,
            }
        });
        const json = await response.json();
        food.value = json;
        console.log(json)
        isLoading.value = false;
    } catch (err) {
        console.log(err)
    };
})

const toLocaleDateString = (dateString: string) => {
    if (dateString) {
        return new Date(dateString).toLocaleDateString();
    } return 'keine Zeit verfügbar.'
};

watchEffect(async () => {
    if (food.value?.image_path) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/download/?filename=${food.value?.image_path}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken.value}`
                }
            });
            const blob = await response.blob();
            imageUrl.value = URL.createObjectURL(blob)
        } catch (error) {
            console.log(error)
        }
    }
})

const encodedGoogleQuery = computed(() => {
    if (food.value && food.value.address) {
        return encodeURI(`${food.value.name}, ${food.value.address}`);
    } else if (food.value && !food.value?.address) return encodeURI(food.value.name || '');
})

const googleSearchUrl = computed(() => {
    if (encodedGoogleQuery.value) {
        const googleUrl = 'https://www.google.com/maps/search/?api=1&query=';
        return `${googleUrl}${encodedGoogleQuery.value}`;
    }
});

const showDeleteModal = ref(false);

const handleDelete = async (foodId: string) => {
    await api.deleteFoodOrdered(foodId);
    await router.push({ name: 'Home' });
};
</script>

<template>
    <div>
        <AppHeader>
            <div @click="$router.back()" class="cursor-pointer pr-2">
                <BackIcon class="hover:transition-transform hover:scale-125 hover:ease-in" />
            </div>
            <div v-if="food" class="font-bold text-lg">{{ food?.name }}</div>
        </AppHeader>
        <Transition>
            <AppModal v-if="showDeleteModal">
                <div class="pb-2">Willst du dieses Gericht endgültig löschen?</div>
                <div class="flex justify-between">
                    <button class="font-bold" @click="handleDelete(foodId)">Ja</button>
                    <button class="font-bold" @click="showDeleteModal = false">Abbrechen</button>
                </div>
            </AppModal>
        </Transition>
        <div v-if="food">
            <div class="border-b-2 border-black">
                <img class="w-full h-72 object-cover object-center" v-if="imageUrl" :src="imageUrl" :alt="food?.name">
            </div>
            <div class="flex flex-col justify-between gap-y-4 p-4">
                <div class="text-sm text-gray-600">{{ toLocaleDateString(food.ordered_at) }}
                </div>
                <div class="text-3xl font-black">{{ food.name }}</div>
                <div class=" text-sm hover:text-primary-purple text-gray-600">
                    <a :href="googleSearchUrl" target=”_blank”>
                        {{ food.restaurant_name }}
                        <div>{{ food.address }}</div>
                    </a>
                </div>
                <div class="text-lg">"{{ food.comment }}"</div>
                <div class="flex gap-1">
                    <StarIcon fill="#8affdc" class="h-8 w-8" v-for="n in food.rating" :key="`${n}-star-rating`" />
                </div>
                <div class="flex gap-1 gap-y-4 flex-wrap">
                    <template v-for="tag in food.tags" :key="tag">
                        <TagBoxVue :is-active="false" :name="tag" />
                    </template>
                </div>
                <div class="flex items-center justify-between gap-2 text-xs">
                    <button @click="showDeleteModal = true"
                        class="flex items-center border border-black shadow-brutal py-1.5 px-1.5 hover:bg-primary-red">
                        <TrashIcon class="pr-1" />
                        <div>Gericht löschen</div>
                    </button>
                    <RouterLink :to="{ name: 'EditFood', params: { foodId } }">
                        <button
                            class="flex items-center border border-black shadow-brutal py-1.5 px-1.5 hover:bg-primary-red">
                            <EditIcon class="pr-1" />
                            <div>Gericht bearbeiten</div>
                        </button>
                    </RouterLink>

                </div>
                <p class="text-xs text-gray-500">zuletzt aktualisiert: {{
                    toLocaleDateString(food.date_updated || '')
                }}</p>
            </div>
        </div>
        <div class="animate-pulse" v-else>
            <div class="w-full h-72 bg-gray-300"></div>
            <div class="mt-8 mx-2">
                <div class="w-5/6 h-4 mb-4 bg-gray-300"></div>
                <div class="w-4/6 h-3 mb-1 bg-gray-300"></div>
                <div class="w-2/6 h-3 bg-gray-300"></div>
                <div class="flex gap-2 mt-4">
                    <StarIcon fill="rgb(209 213 219" class="text-gray-300 h-8 w-8"></StarIcon>
                    <StarIcon fill="rgb(209 213 219" class="text-gray-300  h-8 w-8"></StarIcon>
                    <StarIcon fill="rgb(209 213 219" class="text-gray-300 h-8 w-8"></StarIcon>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.25s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
