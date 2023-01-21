import { ref } from "vue";
import { Leckerlog } from "../types/types";
import { useFetch, useStorage } from "@vueuse/core";

const jwtToken = useStorage('auth', '', localStorage);

export const useRequest = () => {
    const errorMessage = ref();

    const post = async (endpoint: string, body: Record<string, string | number | null | Array<string>>): Promise<Response | unknown> => {
        const path = `${import.meta.env.VITE_BASE_API_URL}${endpoint}`;
        try {
            const response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken.value}`
                },
                body: JSON.stringify(body),
            })
            return response
        }
        catch (error) {
            errorMessage.value = error;
            return error
        }
    };

    const deleteRecord = async (endpoint: string, id: string,): Promise<any> => {
        const path = `${import.meta.env.VITE_BASE_API_URL}${endpoint}/${id}`;
        try {
            const response = await fetch(path, {
                method: 'DELETE',
                headers: {
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

    const queryAll = async (path: string) => {
        try {
            const response = await fetch(path, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response

        }
        catch (error) {
            errorMessage.value = error;
            return []
        }
    }

    return {
        queryAll,
        post,
        deleteRecord,
        errorMessage,
    }
}