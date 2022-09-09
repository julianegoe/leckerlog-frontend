import { User } from '@firebase/auth';
import { defineStore } from 'pinia'
import { ref } from 'vue';
import { auth } from '../firebase/firebase'

export const useUserStore = defineStore('user', () => {
    const userId = ref();
    const idToken = ref();

    async function refreshIdToken(user: User) {
        idToken.value = await user.getIdToken(true);
    }

    async function getIdToken() {
        idToken.value = await auth.currentUser?.getIdToken(true);
    }

    function getUserId() {
        userId.value = auth.currentUser?.uid;
    }

    function updateUserId(uid: string) {
        userId.value = uid
    }

    return { userId, idToken, getIdToken, getUserId, refreshIdToken, updateUserId }
})