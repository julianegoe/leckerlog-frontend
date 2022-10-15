import { computed, ref } from "vue";
import { auth } from "../firebase/firebase";

export const useUser = () => {
    const idToken = computed(async () => {
        return auth.currentUser?.getIdToken(true);
    })
    const userId = ref(auth.currentUser?.uid)
    return {
        idToken,
        userId
    }
}
