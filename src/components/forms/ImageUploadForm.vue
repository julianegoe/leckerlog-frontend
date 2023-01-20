<script lang="ts" setup>
import { useStorage } from '@vueuse/core';
import exifr from 'exifr';
import { computed, ref } from 'vue';

const emit = defineEmits(['update:modelValue'])

const orderedAt = ref('');
const jwtToken = useStorage('auth', '', localStorage);

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
            orderedAt.value = new Date(output.CreateDate).toISOString().split('T')[0];
            emit('update:modelValue', {
                output: output,
                imagePath: imagePath.value,
                orderedAt: orderedAt.value})
        });
    imageFile.value = fileList[0]
};

const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageFile.value)
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${jwtToken.value}`
        }
    });
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
    </form>
    <img v-if="imagePath" class="mt-4" :src="imagePath" alt="selected-image" />
</template>