<script lang="ts" setup>
import { reactive, ref } from 'vue';
import GooglePlacesTextInput from '../components/GooglePlacesTextInput.vue';
import AppHeader from "../components/AppHeader.vue";
import AppStarRatingInput from "../components/AppStarRatingInput.vue";
import AppTextInput from '../components/AppTextInput.vue';
import AppDateInput from '../components/AppDateInput.vue';
import exifr from 'exifr';
import CuisineInput from '../components/CuisineInput.vue';
import { RecordData } from '../types/types';
import SnackBar from '../components/globals/SnackBar.vue';
import { useApi } from '../composables/useApi';
import ChipInput from '../components/ChipInput.vue';
import AppTextarea from '../components/AppTextarea.vue';

const { addRecord } = useApi()

const loading = ref(false);

const inputValues = reactive<RecordData>({
  restaurantName: '',
  cuisine: {
    value: '0',
    label: '',
  },
  ordered_at: '',
  rating: 0,
  comment: '',
  foodName: '',
  image_path: null,
  tags: [],
  address: '',
});

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
};

const showSnackbar = ref(false);
const isValid = ref(false);
const addFood = async () => {
  console.log('image upload is not implemented yet.');
  const result = await addRecord(inputValues);
  if (result) {
    showSnackbar.value = true;
    setTimeout(() => { showSnackbar.value = false}, 500)
  }
};

</script>
<template>
  <div>
    <AppHeader>
      <div class="text-xl font-bold">LeckerLog</div>
    </AppHeader>
    <div class="m-auto p-2">
      <form @submit.prevent="addFood">
        <label for="file-upload" class="cursor-pointer p-2 border border-black active:bg-gray-200">Bild
          auswählen</label>
        <input class="hidden" role="button" id="file-upload" type="file" @change="handlePhotoChange"
          accept="image/jpeg" />
        <GooglePlacesTextInput @update:restaurant="(value) => {
          inputValues.restaurantName = value.name;
          inputValues.address = value.address;
        }" label="Restaurant" input-id="restaurant-input" :latitude="exifGpsData.GPSLatitude"
          :latitude-direction="exifGpsData.GPSLatitudeRef" :longitude="exifGpsData.GPSLongitude"
          :longitude-direction="exifGpsData.GPSLongitudeRef" />
        <CuisineInput v-model="inputValues.cuisine" />
        <AppTextInput @validate="(value) => isValid = value" v-model="inputValues.foodName" label="Gericht"
          id="meal-input" type="text" />
        <AppDateInput v-model="inputValues.ordered_at" :photo-date="inputValues.ordered_at" label="Bestellt am"
          id="date-input" />
        <AppTextarea @validate="(value) => isValid = value" v-model="inputValues.comment" label="Kommentar"
          id="comment-input" type="text" />
        <ChipInput label="Tags" id="tag-input" v-model="inputValues.tags" />
        <AppStarRatingInput v-model="inputValues.rating" />

        <img v-if="inputValues.image_path" class="mt-4" :src="inputValues.image_path" alt="selected-image" />

        <button class="flex justify-center mt-4 p-2 w-32 border border-black active:bg-gray-200" type="submit">
          <div v-if="!loading">Hinzufügen</div>
          <div v-else-if="loading"
            class="w-6 h-6 border-2 border-black border-solid rounded-full animate-spin border-t-transparent"></div>
        </button>
      </form>
      <SnackBar text="Upload erfolgreich" :show-snackbar="showSnackbar" />
    </div>
  </div>
</template>
