<script lang="ts" setup>
import { useStorage } from '@vueuse/core';
import exifr from 'exifr';
import { computed, ref } from 'vue';

const emit = defineEmits(['update:modelValue'])

const orderedAt = ref('');

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
                location: {
                    GPSLatitude: output.GPSLatitude,
                    GPSLatitudeRef: output.GPSLatitudeRef,
                    GPSLongitude: output.GPSLongitude,
                    GPSLongitudeRef: output.GPSLongitudeRef,
                },
                imagePath: imageFile.value.name,
                orderedAt: orderedAt.value,
                imageFile: imageFile.value
            })
        });
    imageFile.value = fileList[0]
};

</script>
<template>
    <div>
        <form enctype="multipart/form-data">
            <label for="file-upload" class="cursor-pointer p-2 border border-black active:bg-gray-200">Bild
                auswählen</label>
            <input class="hidden" role="button" id="file-upload" type="file" name="file" @change="handlePhotoChange"
                accept="image/jpeg" />
        </form>
        <img v-if="imagePath" class="mt-4" :src="imagePath" alt="selected-image" />
    </div>
</template>