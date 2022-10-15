<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import AppHeader from "../components/AppHeader.vue";
import BackIcon from '../assets/icons/chevron-left.svg?component';
import StarIcon from '../assets/icons/star-outline.svg?component'
import TrashIcon from '../assets/icons/trash.svg?component';
import EditIcon from '../assets/icons/edit.svg?component';
import exifr from 'exifr';
import AppModal from '../components/AppModal.vue';
import { computed, onMounted, reactive, Ref, ref } from "vue";
import { useContentStore } from "../store/content";
import { DetailsFoodOrdered, ListItem, RecordData } from "../types/types";
import { useFileDownload } from "../composables/useFileDownload";
import TagBoxVue from "../components/globals/TagBox.vue";
import { useRouter } from "vue-router";
import { useApi } from "../composables/useApi";
import AppStarRatingInput from "../components/AppStarRatingInput.vue";
import AppTextarea from "../components/AppTextarea.vue";
import ChipInput from "../components/ChipInput.vue";
import CuisineInput from "../components/CuisineInput.vue";
import AppTextInput from "../components/AppTextInput.vue";

const content = useContentStore();
const router = useRouter();
const api = useApi();
const loading = ref(false);

const props = defineProps<{
    foodId: string;
}>();

const foodOrdered = computed<DetailsFoodOrdered[]>(() => content.getFoodById(props.foodId));
const inputValues = reactive<any>({
    foodName: foodOrdered.value[0].name || '',
    cuisine: {
        value: foodOrdered.value[0].cuisine_id || 0,
        label: '',
    },
    rating: foodOrdered.value[0].rating || 0,
    comment: foodOrdered.value[0].comment || '',
    tags: foodOrdered.value[0].tags || [],
})

const { getImage } = useFileDownload(foodOrdered.value[0].image_path, 'hero');
const url = ref();

onMounted(async () => {
    url.value = await getImage();
})

const toLocaleDateString = (dateString: string) => {
  if (foodOrdered.value.length) {
    return new Date(dateString).toLocaleDateString();
  }
};

const encodedGoogleQuery = computed(() => {
    if (foodOrdered.value[0].address) {
        return encodeURI(`${foodOrdered.value[0].restaurant_name}, ${foodOrdered.value[0].address}`);
    }
    return encodeURI(foodOrdered.value[0].restaurant_name);
})
const googleSearchUrl = computed(() => {
    const googleUrl = 'https://www.google.com/maps/search/?api=1&query=';
    return `${googleUrl}${encodedGoogleQuery.value}`;
});

const showDeleteModal = ref(false);
const showEditModal = ref(false);

const handleDelete = async (id: string) => {
    await api.deleteFoodOrdered(Number(id));
    await router.push({ name: 'Home' });
};

const isValid = ref(false);
const updateFood = async () => {
  loading.value = true;
  await api.updateFoodOrdered(props.foodId, inputValues);
  loading.value = false;
  showEditModal.value = false;
  await router.push({ name: 'Home' });

};

</script>

<template>
    <div>
        <AppHeader>
            <div @click="$router.back()" class="cursor-pointer pr-2">
                <BackIcon class="hover:transition-transform hover:scale-125 hover:ease-in" />
            </div>
            <div v-if="foodOrdered.length" class="font-bold text-lg">{{ foodOrdered[0].name }}</div>
        </AppHeader>
        <AppModal v-if="showDeleteModal" text="Willst du dieses Gericht endgültig löschen?">
            <div class="text-sm pb-2">Willst du dieses Gericht endgültig löschen?</div>
            <div class="flex justify-between">
                <button class="font-bold" @click="handleDelete(foodId)">Ja</button>
                <button class="font-bold" @click="showDeleteModal = false">Abbrechen</button>
            </div>
        </AppModal>

        <AppModal v-if="showEditModal" text="Willst du dieses Gericht endgültig löschen?">
            <div class="text-md font-bold pb-2">{{foodOrdered[0].name}} bearbeiten</div>
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
          <button class="font-bold" @click="showEditModal = false">Abbrechen</button>
        </AppModal>
        <div v-if="foodOrdered.length">
            <div class="border-b-2 border-black">
                <img class="w-full h-72 object-cover object-center" v-if="url" :src="url" :alt="foodOrdered[0].name">
            </div>
            <div class="flex flex-col justify-between gap-y-4 p-4">
                <div class="text-sm text-gray-600">{{ toLocaleDateString(foodOrdered[0].ordered_at) }}</div>
                <div class="text-3xl font-black">{{ foodOrdered[0].name }}</div>
                <div class=" text-sm hover:text-primary-purple text-gray-600">
                    <a :href="googleSearchUrl" target=”_blank”>
                        {{ foodOrdered[0].restaurant_name }}
                        <div>{{ foodOrdered[0].address }}</div>
                    </a>
                </div>
                <div class="text-lg">"{{ foodOrdered[0].comment }}"</div>
                <div class="flex gap-1">
                    <StarIcon fill="#8affdc" class="h-8 w-8" v-for="n in foodOrdered[0].rating"
                        :key="`${n}-star-rating`" />
                </div>
                <div class="flex gap-1 gap-y-4 flex-wrap">
                    <template v-for="tag in foodOrdered[0].tags" :key="tag">
                        <TagBoxVue :name="tag" />
                    </template>
                </div>
                <div class="flex flex-col items-center justify-start gap-2">
                    <button @click="showDeleteModal = true"
                        class="w-full flex items-center border border-black shadow-brutal py-2 px-2 hover:bg-primary-red">
                        <TrashIcon class="pr-2" />
                        <div>Gericht löschen</div>
                    </button>
                    <button @click="showEditModal = true"
                        class="w-full flex items-center border border-black shadow-brutal py-2 px-2 hover:bg-primary-red">
                        <EditIcon class="pr-2" />
                        <div>Gericht bearbeiten</div>
                    </button>
                </div>
              <p class="text-xs text-gray-500">zuletzt aktualisiert: {{ toLocaleDateString(foodOrdered[0].date_updated) }}</p>
            </div>
        </div>

    </div>

</template>
<style scoped>
.jump-enter-active,
.jump-leave-active {
    transition: transform 0.5s ease;
}

.jump-enter-from,
.jump-leave-to {
    transform: translateY(200%);
}
</style>
