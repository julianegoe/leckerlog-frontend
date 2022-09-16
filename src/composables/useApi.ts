import { Cuisine, FoodOrdered, Leckerlog, RecordData, Restaurant } from "../types/types";
import { useRequest } from "./useRequest";

export const useApi = () => {
    const request = useRequest();

    const getLeckerlog = async (): Promise<Leckerlog[]> => {
        return await request.get('leckerlog')
    }

    const getCuisines = async (): Promise<Cuisine[]> => {
        return await request.get('cuisines');
    }

    const addRecord = async (newRecord: RecordData): Promise<[Restaurant, FoodOrdered] | []> => {
        const leckerlog =  await request.post('leckerlog', {
            restaurantName: newRecord.restaurantName,
            foodName: newRecord.foodName,
            cuisine: newRecord.cuisine.label,
            cuisine_id: newRecord.cuisine.value,
            comment: newRecord.comment,
            rating: newRecord.rating,
            ordered_at: newRecord.ordered_at,
            image_path: newRecord.image_path,
            tags: newRecord.tags,
        })  
        return leckerlog;
    };

    const deleteFoodOrdered = async (foodId: number): Promise<FoodOrdered> => {
        return await request.deleteRecord('food', foodId)   
    }

    return {
        errorMessage: request.errorMessage,
        status: request.status,
        getLeckerlog,
        getCuisines,
        addRecord,
        deleteFoodOrdered,
    }
}