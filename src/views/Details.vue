<script lang="ts" setup>
import AppHeader from "../components/AppHeader.vue";
import BackIcon from '../assets/icons/chevron-left.svg';
import StarIcon from '../assets/icons/star-outline.svg'
import { computed } from "vue";
import { useContentStore } from "../store/content";
import { DetailsFoodOrdered } from "../types/types";
import { useFileDownload } from "../composables/useFileDownload";
import TagBoxVue from "../components/globals/TagBox.vue";

const content = useContentStore();

const props = defineProps<{
    foodId: string;
}>();

const foodOrdered = computed<DetailsFoodOrdered[]>(() => content.getFoodById(props.foodId));

const result = useFileDownload(foodOrdered.value[0].image_path);

const localeDateString = computed(() => {
    if (foodOrdered.value.length) {
        return new Date(foodOrdered.value[0].ordered_at).toLocaleDateString();
    }
});

</script>

<template>
    <div>
        <AppHeader>
            <div @click="$router.back()" class="cursor-pointer pr-2">
                <BackIcon class="hover:transition-transform hover:scale-125 hover:ease-in" />
            </div>
            <div v-if="foodOrdered.length" class="font-bold text-lg">{{ foodOrdered[0].name }}</div>
        </AppHeader>
        <div v-if="foodOrdered.length">
            <div class="border-2 border-black">
                <img class="w-full h-72 object-cover object-center" v-if="result.status.value === 'SUCCESS'"
                    :src="result.imageUrl.value" :alt="foodOrdered[0].name">
            </div>
            <div class="flex flex-col gap-y-4 p-4">
                <div>{{ localeDateString }}</div>
                <div class="text-2xl font-black">{{ foodOrdered[0].name }}</div>
                <div >{{ foodOrdered[0].restaurant_name }}</div>
                <div>{{ foodOrdered[0].address }}</div>
                <div>"{{ foodOrdered[0].comment }}""</div>
                <div class="flex gap-1">
                    <StarIcon fill="#8affdc" class="h-8 w-8" v-for="n in foodOrdered[0].rating"
                        :key="`${n}-star-rating`" />
                </div>
                <div class="flex gap-1 mt-2">
                    <template v-for="tag in foodOrdered[0].tags" :key="tag">
                        <TagBoxVue :name="tag" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>