import { ref } from "vue";
import { Leckerlog } from "../types/types";

export const useRequest = () => {
    const errorMessage = ref();


    const getAll = async (endpoint: string): Promise<Leckerlog[] | []> => {
        const path = `${import.meta.env.VITE_BASE_API_URL}/${endpoint}`;
        try {
            const response = await fetch(path, {
                method: 'GET',
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

    const getOne = async (endpoint: string): Promise<Leckerlog | undefined> => {
        const path = `${import.meta.env.VITE_BASE_API_URL}/${endpoint}`;
        try {
            const response = await fetch(path, {
                method: 'GET',
                headers: {
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
        const path = `${import.meta.env.VITE_BASE_API_URL}/${endpoint}`;
        try {
            const response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            const data = await response.json();
            return data;
        }
        catch (error) {
            errorMessage.value = error;
            return undefined
        }
    };

    const deleteRecord = async (endpoint: string, id: number,): Promise<any> => {
        const path = `${import.meta.env.VITE_BASE_API_URL}/${endpoint}/${id}`;
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