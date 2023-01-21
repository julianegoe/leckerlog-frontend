import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useUiStore = defineStore('ui', () => {

    const showSnackBar = ref(false);
    const snackBarText = ref('Das ist eine Snackbar');

    function openSnackBar(text: string) {
        snackBarText.value = text
        showSnackBar.value = true;
        setTimeout(() => {
            showSnackBar.value = false
        }, 1500)
    }

    return {
        showSnackBar,
        snackBarText,
        openSnackBar
    }
})