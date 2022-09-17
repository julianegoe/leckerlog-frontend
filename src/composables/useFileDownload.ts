import { ref as storageRef, getDownloadURL, getStorage } from "firebase/storage";
import { onMounted, ref } from "vue";

type UploadStatus = 'LOADING' | 'IDLE' | 'SUCCESS' | 'ERROR';

export const useFileDownload = (fileName: string | null) => {
  const status = ref<UploadStatus>('IDLE');
  const imageUrl = ref<string>('https://via.placeholder.com/300x400');

  onMounted(() => {
    status.value = 'LOADING';
    const storage = getStorage();
    if (fileName !== null) {
      getDownloadURL(storageRef(storage, `${fileName.split('.')[0]}_200x200.${fileName.split('.')[1]}`))
        .then((url) => {
          imageUrl.value = url;
          status.value = 'SUCCESS';
        })
        .catch((error) => {
          if (error.code === 'storage/object-not-found') {
            getDownloadURL(storageRef(storage, `${fileName.split('.')[0]}_500x500.${fileName.split('.')[1]}`))
              .then((url) => {
                imageUrl.value = url;
                status.value = 'SUCCESS';
              }).catch((error) => {
                console.log(error)
                status.value = 'ERROR';
              })
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