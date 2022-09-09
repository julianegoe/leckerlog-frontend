import { computed, ref } from "vue";
import { auth } from "../firebase/firebase";

export const useUser = () => {
    const idToken = computed(async () => {
        return await auth.currentUser?.getIdToken(true);
    })
    const userId = ref(auth.currentUser?.uid)
    return {
        idToken,
        userId
    }
}