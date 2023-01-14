import { FoodOrdered, Leckerlog, RecordData } from "../types/types";
import {useRequest} from "./useRequest";

export const useApi = () => {
    const request = useRequest();

    const getLeckerlogById = async (foodId: number): Promise<Leckerlog | undefined> => {
        try {
            return await request.getOne(`food/${foodId}`)
        } catch(error) {
            console.log(error)
            return undefined
        }
    }

    const addRecord = async (newRecord: RecordData): Promise<Leckerlog | undefined> => {
        return await request.post('leckerlog', {
            restaurantName: newRecord.restaurantName,
            foodName: newRecord.foodName,
            cuisine_id: newRecord.cuisine.value,
            address: newRecord.address,
            comment: newRecord.comment,
            rating: newRecord.rating,
            ordered_at: newRecord.ordered_at,
            image_path: newRecord.image_path,
            tags: newRecord.tags,
        });
    };

    const deleteFoodOrdered = async (foodId: number): Promise<FoodOrdered> => {
        return await request.deleteRecord('food', foodId)
    }

    const updateFoodOrdered = async (foodId: number, alteredRecord: Partial<RecordData>): Promise<Leckerlog | undefined> => {
        return await request.post(`food/${foodId}`, {
            restaurantName: alteredRecord.restaurantName || '',
            name: alteredRecord.foodName || '',
            cuisine_id: alteredRecord.cuisine?.value || '1',
            rating: alteredRecord.rating || 0,
            comment: alteredRecord.comment || '',
            tags: alteredRecord.tags || '',
        })
    }

    const queryFood = async (path: string) => {
        return await request.queryAll(path);
    }

    return {
        errorMessage: request.errorMessage,
        getLeckerlogById,
        addRecord,
        deleteFoodOrdered,
        updateFoodOrdered,
        queryFood,
    }
}
