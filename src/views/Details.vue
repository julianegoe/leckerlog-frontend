<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import AppHeader from "../components/AppHeader.vue";
import BackIcon from '../assets/icons/chevron-left.svg?component';
import StarIcon from '../assets/icons/star-outline.svg?component'
import TrashIcon from '../assets/icons/trash.svg?component';
import EditIcon from '../assets/icons/edit.svg?component';
import AppModal from '../components/modals/AppModal.vue';
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useContentStore } from "../store/content";
import { useFileDownload } from "../composables/useFileDownload";
import TagBoxVue from "../components/globals/TagBox.vue";
import { useRouter } from "vue-router";
import { useApi } from "../composables/useApi";

const content = useContentStore();
const router = useRouter();
const api = useApi();

const props = defineProps<{
    foodId: string;
}>();

const leckerlog = computed(() => content.currentFoodOrdered);
const url = ref('https://via.placeholder.com/500');
onMounted(async () => {
    const response = await api.getLeckerlogById(props.foodId)
    content.setCurrentFoodOrdered(response);
    const { getImage } = useFileDownload(leckerlog.value?.food_ordered[0].image_path, 'hero');
    if (leckerlog.value?.food_ordered[0].image_path) { url.value = await getImage() || '' }
})

const toLocaleDateString = (dateString: string) => {
    if (leckerlog.value) {
        return new Date(dateString).toLocaleDateString();
    }
};

const encodedGoogleQuery = computed(() => {
    if (leckerlog.value && leckerlog.value.address) {
        return encodeURI(`${leckerlog.value?.name}, ${leckerlog.value?.address}`);
    } else if (leckerlog.value) return encodeURI(leckerlog.value?.name || '');
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

onUnmounted(() => {
    content.setCurrentFoodOrdered(undefined);
})

</script>

<template>
    <div>
        <AppHeader>
            <RouterLink :to="{ name: 'Home' }">
                <div class="cursor-pointer pr-2">
                    <BackIcon class="hover:transition-transform hover:scale-125 hover:ease-in" />
                </div>
            </RouterLink>
            <div v-if="leckerlog" class="font-bold text-lg">{{ leckerlog?.name }}</div>
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
        <div v-if="leckerlog">
            <div class="border-b-2 border-black">
                <img class="w-full h-72 object-cover object-center" v-if="url" :src="url" :alt="leckerlog?.name">
            </div>
            <div class="flex flex-col justify-between gap-y-4 p-4">
                <div class="text-sm text-gray-600">{{ toLocaleDateString(leckerlog?.food_ordered[0].ordered_at) }}
                </div>
                <div class="text-3xl font-black">{{ leckerlog?.food_ordered[0].name }}</div>
                <div class=" text-sm hover:text-primary-purple text-gray-600">
                    <a :href="googleSearchUrl" target=”_blank”>
                        {{ leckerlog?.name }}
                        <div>{{ leckerlog?.address }}</div>
                    </a>
                </div>
                <div class="text-lg">"{{ leckerlog?.food_ordered[0].comment }}"</div>
                <div class="flex gap-1">
                    <StarIcon fill="#8affdc" class="h-8 w-8" v-for="n in leckerlog?.food_ordered[0].rating"
                        :key="`${n}-star-rating`" />
                </div>
                <div class="flex gap-1 gap-y-4 flex-wrap">
                    <template v-for="tag in leckerlog?.food_ordered[0].tags" :key="tag">
                        <TagBoxVue :name="tag" />
                    </template>
                </div>
                <div class="flex items-center justify-between gap-2 text-xs">
                    <button @click="showDeleteModal = true"
                        class="flex items-center border border-black shadow-brutal py-1.5 px-1.5 hover:bg-primary-red">
                        <TrashIcon class="pr-1" />
                        <div>Gericht löschen</div>
                    </button>
                    <RouterLink :to="{ name: 'EditFood' }">
                        <button
                            class="flex items-center border border-black shadow-brutal py-1.5 px-1.5 hover:bg-primary-red">
                            <EditIcon class="pr-1" />
                            <div>Gericht bearbeiten</div>
                        </button>
                    </RouterLink>

                </div>
                <p class="text-xs text-gray-500">zuletzt aktualisiert: {{
                        toLocaleDateString(leckerlog?.food_ordered[0].date_updated || '')
                }}</p>
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
