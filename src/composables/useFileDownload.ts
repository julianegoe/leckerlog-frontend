import { ref as storageRef, getDownloadURL, getStorage } from "firebase/storage";
import { computed, onMounted, ref } from "vue";

type UploadStatus = 'LOADING' | 'IDLE' | 'SUCCESS' | 'ERROR';
type ImageSize = 'thumbnail' | 'hero' | 'fallback';

export const useFileDownload = (fileName: string | null, imageSize: ImageSize) => {
  const status = ref<UploadStatus>('IDLE');
  const imageUrl = ref<string>('https://via.placeholder.com/300x400');

  const sizeLookUp = new Map([
    ['thumbnail', '500x500'],
    ['hero', '1500x1500'],
    ['fallback', '200x200'],
  ]);
  const size = ref(sizeLookUp.get(imageSize));
  const fallback = ref(sizeLookUp.get('fallback'));

  const imagePath = computed(() => {
    if (fileName !== null) {
      return `${fileName.split('.')[0]}_${size.value}.${fileName.split('.')[1]}`
    } return '';
  });

  const getImage = async () => {
    const storage = getStorage();
    try {
      return await getDownloadURL(storageRef(storage, imagePath.value));
    } catch (error: any) {
      if (error.code === 'storage/object-not-found') {
        if (fileName !== null) {
          return 'https://via.placeholder.com/500'
        }
      }
    }
  };

  return {
    status,
    imageUrl,
    getImage,
  }
}