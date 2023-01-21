import { FoodOrdered, Leckerlog, RecordData } from "../types/types";
import {useRequest} from "./useRequest";

export const useApi = () => {
    const request = useRequest();

    const deleteFoodOrdered = async (foodId: string): Promise<FoodOrdered> => {
        return await request.deleteRecord('food', foodId)
    }

    const queryFood = async (path: string) => {
        return await request.queryAll(path);
    }

    return {
        errorMessage: request.errorMessage,
        deleteFoodOrdered,
        queryFood,
    }
}
