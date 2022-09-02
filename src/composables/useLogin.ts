import { initializeApp } from "firebase/app";
import { ref } from "vue";
import { auth } from "../firebase/firebase";

const currentUser = ref()

export const useLogin = () => {
    currentUser.value = auth.currentUser;

    return {
        currentUser,
    }
};

export const useCurrentUser = () => {
    return currentUser
}