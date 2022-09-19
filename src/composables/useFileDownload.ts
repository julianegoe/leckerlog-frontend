import { ref as storageRef, getDownloadURL, getStorage } from "firebase/storage";
import { computed, onMounted, ref } from "vue";

type UploadStatus = 'LOADING' | 'IDLE' | 'SUCCESS' | 'ERROR';
type ImageSize = 'thumbnail' | 'hero' | 'fallback';

export const useFileDownload = (fileName: string | null, imageSize: ImageSize) => {
  const status = ref<UploadStatus>('IDLE');
  const imageUrl = ref<string>('https://via.placeholder.com/300x400');

  const sizeLookUp = new Map([
    ['thumbnail', '200x200'],
    ['hero', '1500x1500'],
    ['fallback', '200x200'],
  ]);
  const size = ref(sizeLookUp.get(imageSize));
  const fallback = ref(sizeLookUp.get('fallback'));

  const downloadUrl = computed(() => {
    if (fileName !== null) {
      return `${fileName.split('.')[0]}_${size.value}.${fileName.split('.')[1]}`
    } return '';
  })
  onMounted(() => {
    status.value = 'LOADING';
    const storage = getStorage();
    if (downloadUrl) {
      getDownloadURL(storageRef(storage, downloadUrl.value))
        .then((url) => {
          imageUrl.value = url;
          status.value = 'SUCCESS';
        })
        .catch((error) => {
          if (error.code === 'storage/object-not-found') {
            if (fileName !== null) {
              getDownloadURL(storageRef(storage, `${fileName.split('.')[0]}_${fallback.value}.${fileName.split('.')[1]}`))
                .then((url) => {
                  imageUrl.value = url;
                  status.value = 'SUCCESS';
                }).catch((error) => {
                  console.log(error)
                  status.value = 'ERROR';
                })
            }
          } else { console.log(error) }
        });
    }
    status.value = 'SUCCESS'
  })

  return {
    status,
    imageUrl,
  }
}