<script lang="ts" setup>
import { ref } from 'vue';
import AppHeader from "../components/AppHeader.vue";
import AppStarRatingInput from "../components/AppStarRatingInput.vue";
import AppTextInput from '../components/AppTextInput.vue';
import AppDateInput from '../components/AppDateInput.vue';
import CuisineInput from '../components/CuisineInput.vue';
import { INPUT_DEFAULT_VALUES, RecordData } from '../types/types';
import ChipInput from '../components/ChipInput.vue';
import AppTextarea from '../components/AppTextarea.vue';
import ImageUploadForm from '../components/forms/ImageUploadForm.vue';
import GooglePlacesTextInput from '../components/GooglePlacesTextInput.vue';
import { useStorage } from '@vueuse/core';
import { useRequest } from '../composables/useRequest';
import { useUiStore } from '../store/ui';

const jwtToken = useStorage('auth', '', localStorage);
const user = useStorage('user', {
  user_id: '',
  email: '',
  password: '',
  username: null,
}, localStorage);
const { post } = useRequest();
const ui = useUiStore();
const loading = ref(false);

const inputValues = ref<RecordData>({ ...INPUT_DEFAULT_VALUES })
const isValid = ref(false);

const uploadImage: any = async () => {
  const formData = new FormData();
  if (inputValues.value.photoData.imageFile) {
    formData.append('file', inputValues.value.photoData.imageFile)
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${jwtToken.value}`
      }
    });
    return response;
  }
}

const uploadData: any = async () => {
  try {
    const response = await post(`/leckerlog/${user.value.user_id}`, {
      restaurant_name: inputValues.value.restaurantName,
      food_name: inputValues.value.foodName,
      cuisine_id: inputValues.value.cuisine.value,
      address: inputValues.value.address,
      comment: inputValues.value.comment,
      rating: inputValues.value.rating,
      ordered_at: inputValues.value.photoData.orderedAt,
      image_path: inputValues.value.photoData.imagePath,
      tags: inputValues.value.tags
    });
    return response;
  } catch (err) {
    console.log(err)
    return err
  }
};

const upload = async () => {
  loading.value = true;
  const responseImage = await uploadImage();
  const responseData = await uploadData();
  console.log(responseImage.status, responseData.status)
  if (responseImage.status === 200 && responseData.status === 200) {
    loading.value = false
    const imageData = await responseImage.json();
    const leckerlog = await responseData.json();
    console.log(imageData, leckerlog)
    inputValues.value = { ...INPUT_DEFAULT_VALUES };
    ui.openSnackBar('Upload erfolgeich.');
  }
}


</script>
<template>
  <div class="mb-20">
    <AppHeader>
      <div class="text-xl font-bold">LeckerLog</div>
    </AppHeader>
    <div class="flex flex-col gap-y-1 p-2">
      <ImageUploadForm v-model="inputValues.photoData" />
      <form @submit.prevent="upload">
        <GooglePlacesTextInput @update:restaurant="(value: any) => {
          inputValues.restaurantName = value.name;
          inputValues.address = value.address;
        }" label="Restaurant" input-id="restaurant-input" :latitude="inputValues.photoData.location.GPSLatitude"
          :latitude-direction="inputValues.photoData.location.GPSLatitudeRef"
          :longitude="inputValues.photoData.location.GPSLongitude"
          :longitude-direction="inputValues.photoData.location.GPSLongitudeRef" />
        <CuisineInput v-model="inputValues.cuisine" />
        <AppTextInput @validate="(value) => isValid = value" v-model="inputValues.foodName" label="Gericht"
          id="meal-input" type="text" />
        <AppDateInput v-model="inputValues.photoData.orderedAt" :photo-date="inputValues.photoData.orderedAt"
          label="Bestellt am" id="date-input" />
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
    </div>
  </div>
</template>
