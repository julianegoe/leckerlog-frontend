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
import AppDateInput from "../components/AppDateInput.vue";
import AppTextarea from "../components/AppTextarea.vue";
import ChipInput from "../components/ChipInput.vue";
import CuisineInput from "../components/CuisineInput.vue";
import { useFileUpload } from "../composables/useFileUpload";

const content = useContentStore();
const router = useRouter();
const api = useApi();
const loading = ref(false);
const showSnackbar = ref(false);

const props = defineProps<{
    foodId: string;
}>();

const foodOrdered = computed<DetailsFoodOrdered[]>(() => content.getFoodById(props.foodId));
const inputValues = reactive<any>({
    cuisine: {
        value: foodOrdered.value[0].cuisine_id || 0,
        label: '',
    },
    ordered_at: foodOrdered.value[0].ordered_at || '',
    rating: foodOrdered.value[0].rating || 0,
    comment: foodOrdered.value[0].comment || '',
    image_path: foodOrdered.value[0].image_path || '',
    tags: foodOrdered.value[0].tags || [],
})

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
};

const arrayBuffer = ref();
const fileName = ref(null);
let exifGpsData = ref({
  GPSLatitude: [52, 31, 12.0288] as [number, number, number],
  GPSLatitudeRef: 'N',
  GPSLongitude: [13, 24, 17.8344] as [number, number, number],
  GPSLongitudeRef: 'E',
})
const handlePhotoChange = (e: any) => {
  const fileList = e.target?.files;
  exifr.parse(fileList[0])
    .then(output => {
      if (!output) {
        return
      }
      exifGpsData.value.GPSLatitude = output.GPSLatitude;
      exifGpsData.value.GPSLatitudeRef = output.GPSLatitudeRef;
      exifGpsData.value.GPSLongitude = output.GPSLongitude;
      exifGpsData.value.GPSLongitudeRef = output.GPSLongitudeRef;
      inputValues.ordered_at = new Date(output.CreateDate).toISOString().split('T')[0];
    });
  inputValues.image_path = URL.createObjectURL(fileList[0]);
  fileName.value = fileList[0].name;
  // Check if the file is an image.
  if (fileList[0].type && !fileList[0].type.startsWith('image/')) {
    console.log('File is not an image.', fileList[0].type, fileList[0]);
    return;
  }
  const reader = new FileReader();
  reader.readAsArrayBuffer(fileList[0])
  reader.addEventListener('load', (event) => {
    arrayBuffer.value = event.target?.result;
  });
};

const result = useFileUpload(fileName, arrayBuffer);

const isValid = ref(false);
const addFood = async () => {
  showSnackbar.value = false;
  if (isValid.value) {
    loading.value = true;
    await result.uploadImage();
    if (result.imagePath) {
      inputValues.image_path = result.imagePath.value;
    }
    if (result.status.value === 'SUCCESS') {
      const addedRecord = await api.addRecord(inputValues);
      console.log(addedRecord)
      if (addedRecord.length) {
        loading.value = false
        showSnackbar.value = true;
        setTimeout(() => showSnackbar.value = false, 2000)
      }
    }
  }
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
        <AppModal v-if="showdDeleteModal" text="Willst du dieses Gericht endgültig löschen?">
            <div class="text-sm pb-2">Willst du dieses Gericht endgültig löschen?</div>
            <div class="flex justify-between">
                <button class="font-bold" @click="handleDelete(foodId)">Ja</button>
                <button class="font-bold" @click="showdDeleteModal = false">Abbrechen</button>
            </div>
        </AppModal>

        <AppModal v-if="showdEditModal" text="Willst du dieses Gericht endgültig löschen?">
            <div class="text-md font-bold pb-2">{{foodOrdered[0].name}} bearbeiten</div>
            <div class="text-sm">
                <form @submit.prevent="addFood">
                    <label for="file-upload" class="cursor-pointer p-2 border border-black active:bg-gray-200">Bild
                        auswählen</label>
                    <input class="hidden" role="button" id="file-upload" type="file" @change="handlePhotoChange"
                        accept="image/jpeg" />
                    <CuisineInput @update="(value: ListItem) => inputValues.cuisine = value" />
                    <AppStarRatingInput />
                    <AppDateInput v-model="inputValues.ordered_at" :photo-date="inputValues.ordered_at"
                        label="Bestellt am" id="date-input" />
                    <AppTextarea v-model="inputValues.comment" label="Kommentar" id="comment-input" type="text" />
                    <ChipInput label="Tags" id="tag-input" v-model="inputValues.tags" />
                    <AppStarRatingInput @change:stars="(value) => inputValues.rating = value" />
                </form>
            </div>
            <button class="font-bold" @click="showdEditModal = false">Schließen</button>
        </AppModal>
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
                <div class="flex flex-col items-center justify-start gap-2">
                    <button @click="showdDeleteModal = true"
                        class="w-full flex items-center border border-black shadow-brutal py-2 px-2 hover:bg-primary-red">
                        <TrashIcon class="pr-2" />
                        <div>Gericht löschen</div>
                    </button>
                    <button @click="showdEditModal = true"
                        class="w-full flex items-center border border-black shadow-brutal py-2 px-2 hover:bg-primary-red">
                        <EditIcon class="pr-2" />
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