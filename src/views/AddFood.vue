<script lang="ts" setup>
import { cloneDeep } from 'lodash';
import { ref } from 'vue';
import AppHeader from "../components/AppHeader.vue";
import Box from '../components/globals/Box.vue';
import AppButton from '../components/globals/AppButton.vue';
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
import { useUiStore } from '../store/ui';
import { responseInterceptor } from '../utils/requests';

const accessToken = useStorage('accessToken', '', localStorage);
const refreshToken = useStorage('refreshToken', '', localStorage);
const user = useStorage('user', {
  user_id: '',
  email: '',
  password: '',
  username: null,
}, localStorage);
const ui = useUiStore();
const loading = ref(false);

const inputValues = ref<RecordData>({ ...cloneDeep(INPUT_DEFAULT_VALUES) })
const isValid = ref(false);

const uploadImage: any = async () => {
  const formData = new FormData();
  if (inputValues.value.photoData.imageFile) {
    formData.append('file', inputValues.value.photoData.imageFile)
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken.value}`
      }
    });
    return response;
  }
}

const uploadData: any = async () => {
  const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/leckerlog/${user.value.user_id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      restaurant_name: inputValues.value.restaurantName,
      food_name: inputValues.value.foodName,
      cuisine_id: inputValues.value.cuisine.value,
      address: inputValues.value.address,
      comment: inputValues.value.comment,
      rating: inputValues.value.rating,
      ordered_at: inputValues.value.photoData.orderedAt,
      image_path: inputValues.value.photoData.imagePath,
      tags: inputValues.value.tags
    })
  });
  return response;
};

const upload = async () => {
  loading.value = true;
  const responseImage = await uploadImage();
  const responseData = await uploadData();
  if (responseImage.status === 200 && responseData.status === 200) {
    loading.value = false
    await responseImage.json();
    await responseData.json();
    ui.openSnackBar('Upload erfolgeich.');
    inputValues.value = { ...cloneDeep(INPUT_DEFAULT_VALUES) };
  } else {
    loading.value = false;
    ui.openSnackBar('Upload gescheitert. Versuche es erneut.');
  }
}


</script>
<template>
  <div>
    <AppHeader>
      <div class="text-xl font-bold">LeckerLog</div>
    </AppHeader>
    <div class="flex flex-col gap-y-1 p-2">
      <ImageUploadForm v-model="inputValues.photoData" />
      <Box class="m-2">
        <template #header>
          <span class="pl-2 text-white">Füge ein Gericht hinzu...</span>
        </template>
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
          <AppDateInput v-model="inputValues.photoData.orderedAt" label="Bestellt am" id="date-input" />
          <AppTextarea @validate="(value) => isValid = value" v-model="inputValues.comment" label="Kommentar"
            id="comment-input" type="text" />
          <ChipInput label="Tags" id="tag-input" v-model="inputValues.tags" />
          <AppStarRatingInput v-model="inputValues.rating" />
          <AppButton class="w-28">
            <div v-if="!loading">Hinzufügen</div>
            <div v-else-if="loading"
              class="w-6 h-6 border-2 border-black border-solid rounded-full animate-spin border-t-transparent"></div>
          </AppButton>
        </form>
      </Box>
    </div>
  </div>
</template>
