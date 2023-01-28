<script lang="ts" setup>
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
    <div class="flex flex-col items-center">
        <form enctype="multipart/form-data">
            <label for="file-upload"
                class="cursor-pointer flex justify-center py-1.5 px-2 border bg-white border-black shadow-brutal hover:shadow-none  hover:bg-black hover:text-white">Bild
                auswählen</label>
            <input class="hidden" role="button" id="file-upload" type="file" name="file" @change="handlePhotoChange"
                accept="image/jpeg" />
        </form>
        <img class="w-3/4 object-contain border-2 border-black mt-4" v-if="imagePath" :src="imagePath"
            alt="selected-image" />
    </div>
</template>