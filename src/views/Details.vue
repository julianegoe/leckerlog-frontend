<script lang="ts" setup>
import AppHeader from "../components/AppHeader.vue";
import BackIcon from '../assets/icons/chevron-left.svg';
import StarIcon from '../assets/icons/star-outline.svg'
import TrashIcon from '../assets/icons/trash.svg';
import AppModal from '../components/AppModal.vue';
import { computed, onMounted, ref } from "vue";
import { useContentStore } from "../store/content";
import { DetailsFoodOrdered } from "../types/types";
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

const foodOrdered = computed<DetailsFoodOrdered[]>(() => content.getFoodById(props.foodId));

const { getImage } = useFileDownload(foodOrdered.value[0].image_path, 'hero');
const url = ref();

onMounted(async () => {
    url.value = await getImage();
})

const localeDateString = computed(() => {
    if (foodOrdered.value.length) {
        return new Date(foodOrdered.value[0].ordered_at).toLocaleDateString();
    }
});

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

const showdDeleteModal = ref(false);
const showdEditModal = ref(false);

const handleDelete = async (id: string) => {
    await api.deleteFoodOrdered(Number(id));
    router.push({ name: 'Home' });
}

</script>

<template>
    <div>
        <AppHeader>
            <div @click="$router.back()" class="cursor-pointer pr-2">
                <BackIcon class="hover:transition-transform hover:scale-125 hover:ease-in" />
            </div>
            <div v-if="foodOrdered.length" class="font-bold text-lg">{{ foodOrdered[0].name }}</div>
        </AppHeader>
        <Transition name="jump">
            <AppModal v-if="showdDeleteModal"
                text="Willst du dieses Gericht endgültig löschen?">
                <div class="text-sm pb-2">Willst du dieses Gericht endgültig löschen?</div>
                <div class="flex justify-between">
                    <button class="font-bold" @click="handleDelete(foodId)">Ja</button>
                    <button class="font-bold" @click="showdDeleteModal = false">Abbrechen</button>
                </div>
            </AppModal>
        </Transition>

        <Transition name="jump">
            <AppModal v-if="showdEditModal"
                text="Willst du dieses Gericht endgültig löschen?">
                <div class="text-md font-bold pb-2">{{foodOrdered[0].name}} bearbeiten</div>
                <div class="text-sm"> hier wirst du bald Gerichte beareiten können.</div>
                <button class="font-bold" @click="showdEditModal = false">Schließen</button>
            </AppModal>
        </Transition>
        <div v-if="foodOrdered.length">
            <div class="border-b-2 border-black">
                <img class="w-full h-72 object-cover object-center" v-if="url" :src="url" :alt="foodOrdered[0].name">
            </div>
            <div class="flex flex-col justify-between gap-y-4 p-4">
                <div class="text-sm text-gray-600">{{ localeDateString }}</div>
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
                <div class="flex items-center justify-start gap-2">
                    <button @click="showdDeleteModal = true"
                        class="flex items-center border border-black shadow-brutal py-2 px-2.5 hover:bg-primary-red">
                        <TrashIcon class="pr-2" />
                        <div>Gericht löschen</div>
                    </button>
                    <button @click="showdEditModal = true"
                        class="flex items-center border border-black shadow-brutal py-2 px-2.5 hover:bg-primary-red">
                        <TrashIcon class="pr-2" />
                        <div>Gericht bearbeiten</div>
                    </button>
                </div>
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