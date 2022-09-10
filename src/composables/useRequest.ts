import { ref } from "vue";
import { auth } from "../firebase/firebase";
import { useUserStore } from "../store/user";
import { Leckerlog, Restaurant, FoodOrdered } from "../types/types";

export const useRequest = () => {
    type UploadStatus = 'LOADING' | 'IDLE' | 'SUCCESS' | 'ERROR';
    const status = ref<UploadStatus>('IDLE');
    const errorMessage = ref();

    const store = useUserStore();

    const get = async (endpoint: string): Promise<Leckerlog[] | []> => {
        const path = `${import.meta.env.VITE_BASE_API_URL}/${endpoint}/${store.userId}`;
        status.value = 'LOADING';
        try {
            const response = await fetch(path, {
                method: 'GET',
                headers: {
                    'AuthToken': store.idToken || '',
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            status.value = 'SUCCESS';
            return data;

        }
        catch (error) {
            status.value = 'ERROR';
            errorMessage.value = error;
            return []
        }
        return []
    };

    const post = async (endpoint: string, body: Record<string, string | number | null>): Promise<[Restaurant, FoodOrdered] | []> => {
        const idToken = await auth.currentUser?.getIdToken(true);
        const path = `${import.meta.env.VITE_BASE_API_URL}/${endpoint}/${auth.currentUser?.uid}`;
        status.value = 'LOADING';
        try {
            if (idToken) {
                const response = await fetch(path, {
                    method: 'POST',
                    headers: {
                        'AuthToken': idToken || '',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                const data = await response.json();
                status.value = 'SUCCESS';
                return data;
            };
        }
        catch (error) {
            status.value = 'ERROR';
            errorMessage.value = error;
            return []
        }
        return []
    };

    const deleteRecord = async (endpoint: string, id: number,): Promise<any> => {
        const idToken = await auth.currentUser?.getIdToken(true);
        const path = `${import.meta.env.VITE_BASE_API_URL}/${endpoint}/${auth.currentUser?.uid}/${id}`;
        status.value = 'LOADING';
        try {
            if (idToken) {
                const response = await fetch(path, {
                    method: 'DELETE',
                    headers: {
                        'AuthToken': idToken || '',
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                status.value = 'SUCCESS';
                return data;
            };
        }
        catch (error) {
            status.value = 'ERROR';
            errorMessage.value = error;
            return []
        }
        return [];
    };

    return {
        get,
        post,
        deleteRecord,
        errorMessage,
        status,
    }
}