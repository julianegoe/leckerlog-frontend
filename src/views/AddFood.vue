<script lang="ts" setup>
import { reactive, ref } from 'vue';
import AppHeader from "../components/AppHeader.vue";
import AppStarRatingInput from "../components/AppStarRatingInput.vue";
import AppTextInput from '../components/AppTextInput.vue';
import AppDateInput from '../components/AppDateInput.vue';
import CuisineInput from '../components/CuisineInput.vue';
import { RecordData } from '../types/types';
import SnackBar from '../components/globals/SnackBar.vue';
import { useApi } from '../composables/useApi';
import ChipInput from '../components/ChipInput.vue';
import AppTextarea from '../components/AppTextarea.vue';
import ImageUploadForm from '../components/forms/ImageUploadForm.vue';

const { addRecord } = useApi()

const loading = ref(false);

const photoData = ref();
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
  image_path: '',
  tags: [],
  address: '',
});

const showSnackbar = ref(false);
const isValid = ref(false);
const addFood = async () => {
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
      <ImageUploadForm v-model="photoData" />
      <form @submit.prevent="addFood">
        <GooglePlacesTextInput @update:restaurant="(value: any) => {
          inputValues.restaurantName = value.name;
          inputValues.address = value.address;
        }" label="Restaurant" input-id="restaurant-input" :latitude="photoData.output.GPSLatitude"
          :latitude-direction="photoData.output.GPSLatitudeRef" :longitude="photoData.output.GPSLongitude"
          :longitude-direction="photoData.output.GPSLongitudeRef" />
        <CuisineInput v-model="inputValues.cuisine" />
        <AppTextInput @validate="(value) => isValid = value" v-model="inputValues.foodName" label="Gericht"
          id="meal-input" type="text" />
        <AppDateInput v-model="inputValues.ordered_at" :photo-date="inputValues.ordered_at" label="Bestellt am"
          id="date-input" />
        <AppTextarea @validate="(value) => isValid = value" v-model="inputValues.comment" label="Kommentar"
          id="comment-input" type="text" />
        <ChipInput label="Tags" id="tag-input" v-model="inputValues.tags" />
        <AppStarRatingInput v-model="inputValues.rating" />
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
