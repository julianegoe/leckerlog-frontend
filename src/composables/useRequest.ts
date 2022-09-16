import { ref } from "vue";
import { auth } from "../firebase/firebase";
import { useUserStore } from "../store/user";
import { Leckerlog, Restaurant, FoodOrdered } from "../types/types";

export const useRequest = () => {
    const errorMessage = ref();

    const store = useUserStore();

    const get = async (endpoint: string): Promise<Leckerlog[] | []> => {
        const path = `${import.meta.env.VITE_BASE_API_URL}/${endpoint}/${store.userId}`;
        try {
            const response = await fetch(path, {
                method: 'GET',
                headers: {
                    'AuthToken': store.idToken || '',
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            return data;

        }
        catch (error) {
            errorMessage.value = error;
            return []
        }
    };

    const post = async (endpoint: string, body: Record<string, string | number | null | Array<string>>): Promise<[Restaurant, FoodOrdered] | []> => {
        const path = `${import.meta.env.VITE_BASE_API_URL}/${endpoint}/${store.userId}`;
        try {
            console.log(JSON.stringify(body));
            if (store.idToken) {
                const response = await fetch(path, {
                    method: 'POST',
                    headers: {
                        'AuthToken': store.idToken || '',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                const data = await response.json();
                return data;
            };
        }
        catch (error) {
            errorMessage.value = error;
            return []
        }
        return []
    };

    const deleteRecord = async (endpoint: string, id: number,): Promise<any> => {
        const idToken = await auth.currentUser?.getIdToken(true);
        const path = `${import.meta.env.VITE_BASE_API_URL}/${endpoint}/${auth.currentUser?.uid}/${id}`;
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
                return data;
            };
        }
        catch (error) {
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
    }
}