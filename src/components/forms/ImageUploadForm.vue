<script lang="ts" setup>
import { useFetch } from '@vueuse/core';
import exifr from 'exifr';
import { computed, ref } from 'vue';

const orderedAt = ref('')

const exifGpsData = ref({
    GPSLatitude: [52, 31, 12.0288] as [number, number, number],
    GPSLatitudeRef: 'N',
    GPSLongitude: [13, 24, 17.8344] as [number, number, number],
    GPSLongitudeRef: 'E',
})
const imageFile = ref();
const imagePath = computed(() => {
    if (imageFile.value) {
        return URL.createObjectURL(imageFile.value)
    } return ''
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
            orderedAt.value = new Date(output.CreateDate).toISOString().split('T')[0];
        });
    imageFile.value = fileList[0]
};

const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageFile.value)
    const response = await fetch(`${import.meta.env.VITE_IMAGE_API_URL}/image/upload`, {
        method: 'POST',
        body: formData,
    })
    console.log(response)
}

</script>
<template>
    <form enctype="multipart/form-data" @submit.prevent="uploadImage">
        <label for="file-upload" class="cursor-pointer p-2 border border-black active:bg-gray-200">Bild
            auswählen</label>
        <input class="hidden" role="button" id="file-upload" type="file" name="file" @change="handlePhotoChange"
            accept="image/jpeg" />
        <button class="flex justify-center mt-4 p-2 w-32 border border-black active:bg-gray-200" type="submit">Image Submit</button>
        <button type="submit">Image Submit</button>
    </form>
    <img v-if="imagePath" class="mt-4" :src="imagePath" alt="selected-image" />
</template>