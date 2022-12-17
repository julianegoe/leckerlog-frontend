import { ref } from "vue";
import { auth } from "../firebase/firebase";
import { useUserStore } from "../store/user";
import { Leckerlog } from "../types/types";

export const useRequest = () => {
    const errorMessage = ref();

    const store = useUserStore();

    const getAll = async (endpoint: string): Promise<Leckerlog[] | []> => {
        const path = `${ import.meta.env.VITE_BASE_API_URL}/${endpoint}/${store.userId}`;
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

    const getOne = async (endpoint: string): Promise<Leckerlog | undefined> => {
        const path = `${ import.meta.env.VITE_BASE_API_URL}/${endpoint}/${store.userId}`;
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
            return undefined
        }
    };

    const post = async (endpoint: string, body: Record<string, string | number | null | Array<string>>): Promise<Leckerlog | undefined> => {
        const path = `${ import.meta.env.VITE_BASE_API_URL}/${endpoint}/${store.userId}`;
        try {
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
            return undefined
        }
        return undefined
    };

    const deleteRecord = async (endpoint: string, id: string,): Promise<any> => {
        const idToken = await auth.currentUser?.getIdToken(true);
        const path = `${ import.meta.env.VITE_BASE_API_URL}/${endpoint}/${auth.currentUser?.uid}/${id}`;
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

    const queryAll = async (path: string) => {
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
    }

    return {
        getAll,
        getOne,
        queryAll,
        post,
        deleteRecord,
        errorMessage,
    }
}