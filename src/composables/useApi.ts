import {Cuisine, FoodOrdered, Leckerlog, RecordData, Restaurant} from "../types/types";
import {useRequest} from "./useRequest";

export const useApi = () => {
    const request = useRequest();

    const getLeckerlog = async (): Promise<Leckerlog[]> => {
        try {
            return await request.get('leckerlog')
        } catch(error) {
            console.log(error)
            return []
        }
    }

    const getCuisines = async (): Promise<Cuisine[]> => {
        return await request.get('cuisines');
    }

    const addRecord = async (newRecord: RecordData): Promise<[Restaurant, FoodOrdered] | []> => {
        return await request.post('leckerlog', {
            restaurantName: newRecord.restaurantName,
            foodName: newRecord.foodName,
            cuisine: newRecord.cuisine.label,
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

    const updateFoodOrdered = async (foodId: string, alteredRecord: Partial<RecordData>) => {
        return await request.post(`food/${foodId}`, {
            restaurantName: alteredRecord.restaurantName || '',
            name: alteredRecord.foodName || '',
            cuisine_id: alteredRecord.cuisine?.value || 1,
            rating: alteredRecord.rating || 0,
            comment: alteredRecord.comment || '',
            tags: alteredRecord.tags || '',
        })
    }

    return {
        errorMessage: request.errorMessage,
        getLeckerlog,
        getCuisines,
        addRecord,
        deleteFoodOrdered,
        updateFoodOrdered,
    }
}
