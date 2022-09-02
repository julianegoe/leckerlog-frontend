import { uploadBytes, ref as storageRef } from "firebase/storage";
import { Ref, ref } from "vue";
import { storage } from "../firebase/firebase";

type UploadStatus = 'LOADING' | 'IDLE' | 'SUCCESS' | 'ERROR';

export const useFileUpload = (fileName: Ref<string | null>, arrayBuffer: Ref<ArrayBuffer>) => {
    const status = ref<UploadStatus>('IDLE');
    const imagePath = ref<string | null>(null);

    const uploadImage = async () => {
      if (fileName.value !== null) {
        status.value = 'LOADING';
        const imageRef = storageRef(storage, `images/${fileName.value}`);
        const snapshot = await uploadBytes(imageRef, arrayBuffer.value, {
        contentType: 'image/jpeg',
        });
        status.value = 'SUCCESS';
        imagePath.value =  snapshot.ref.fullPath
      }
    }

  return {
    status,
    imagePath,
    uploadImage,
  }
}