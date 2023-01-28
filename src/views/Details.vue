<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import AppHeader from "../components/AppHeader.vue";
import Box from "../components/globals/Box.vue";
import AppButton from "../components/globals/AppButton.vue";
import BackIcon from '../assets/icons/chevron-left.svg?component';
import StarIcon from '../assets/icons/star-outline.svg?component'
import TrashIcon from '../assets/icons/trash.svg?component';
import EditIcon from '../assets/icons/edit.svg?component';
import AppModal from '../components/modals/AppModal.vue';
import { computed, onMounted, ref, watchEffect } from "vue";
import TagBoxVue from "../components/globals/TagBox.vue";
import { useRouter } from "vue-router";
import { useStorage } from "@vueuse/core";
import { FoodOrderedExtended } from "../types/types";
import { useUiStore } from "../store/ui";

const router = useRouter();
const ui = useUiStore()

const jwtToken = useStorage('auth', '', localStorage);

const props = defineProps<{
    foodId: string;
}>();

const imageUrl = ref('');
const isLoading = ref(true);

const food = ref<FoodOrderedExtended>();
const getPath = `${import.meta.env.VITE_BASE_API_URL}/food/details/?foodId=${props.foodId}`;
onMounted(async () => {
    try {
        const response = await fetch(getPath, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken.value}`,
            }
        });
        const json = await response.json();
        food.value = json;
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

const handleDelete = async () => {
    const deletePath = `${import.meta.env.VITE_BASE_API_URL}/food/delete/?foodId=${props.foodId}&imagePath=${food.value?.image_path}`;
    try {
        const response = await fetch(deletePath, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken.value}`
            },
        });
        showDeleteModal.value = false;
        router.push({ name: 'Home' });
        ui.openSnackBar('Erfolgreich gelöscht.')

    }
    catch (error) {
        console.log(error)
    }
};
</script>

<template>
    <div class="mb-20">
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
                    <button class="font-bold" @click="handleDelete">Ja</button>
                    <button class="font-bold" @click="showDeleteModal = false">Abbrechen</button>
                </div>
            </AppModal>
        </Transition>
        <div v-if="food">
            <div class="border-b-2 border-b-black">
                <img class="w-full h-72 object-cover object-center" v-if="imageUrl" :src="imageUrl" :alt="food?.name">
                <div v-else class="animate-pulse bg-gray-300 w-full h-72"></div>
            </div>

            <div class="flex flex-col justify-between gap-y-3">
                <Box class="m-4">
                    <template #header>
                        <div class="flex justify-end gap-x-4 py-1">
                            <TrashIcon @click="showDeleteModal = true" class=" cursor-pointer text-white pr-1" />
                            <RouterLink :to="{ name: 'EditFood', params: { foodId } }">
                                <EditIcon class="text-white pr-1" />
                            </RouterLink>
                        </div>
                    </template>
                    <template class="flex flex-col gap-y-2">
                        <div class="text-sm text-gray-600">{{ toLocaleDateString(food.ordered_at) }}
                        </div>
                        <div class="text-2xl font-black">{{ food.name }}</div>
                        <div class=" text-sm hover:text-primary-purple text-gray-600">
                            <a :href="googleSearchUrl" target=”_blank”>
                                {{ food.restaurant_name }}
                                <div>{{ food.address }}</div>
                            </a>
                        </div>
                        <div class="text-lg">"{{ food.comment }}"</div>
                        <div class="flex gap-1">
                            <StarIcon fill="#8affdc" class="h-8 w-8" v-for="n in food.rating"
                                :key="`${n}-star-rating`" />
                        </div>
                        <div class="flex gap-1 gap-y-4 flex-wrap">
                            <template v-for="tag in food.tags" :key="tag">
                                <TagBoxVue :is-active="false" :name="tag" />
                            </template>
                        </div>
                    </template>
                </Box>
                <p class="text-xs text-gray-500 px-4">zuletzt aktualisiert: {{
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
