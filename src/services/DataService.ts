import { createRecord, getCurrentUser, query } from "thin-backend"

export const addFoodToData = async (newEntry: any) => {
    const user = await getCurrentUser();
    let newFoodOrdered = {
        name: newEntry.foodName as string,
        cuisine: newEntry.foodCuisine.label as string,
        rating: newEntry.foodRating as number,
        comment: newEntry.foodComment as string,
        restaurantId: '' as string,
        orderedAt: newEntry.orderedAt as string,
        imagePath: newEntry.displayImage as string | null,
    }
    if (user !== null) {
        // check if restaurant exists
    const restaurant = await query('restaurants')
    .where('userId', user.id)
    .and(query('restaurants')
    .where('name', newEntry.restaurantName))
    .fetchOne();
if (restaurant !== null) {
    newFoodOrdered.restaurantId = restaurant.id
    try {
        await createRecord('food_ordered', newFoodOrdered);
    } catch(error) {
        console.log(error);
    }
} else {
    const newRestaurant = {
        name: newEntry.restaurantName as string,
        cuisine: newEntry.foodCuisine.label as string,
        cuisineId: newEntry.foodCuisine.value as string,
    };
    try {
        const addedRestaurant = await createRecord('restaurants', newRestaurant);
        newFoodOrdered.restaurantId = addedRestaurant.id
        await createRecord('food_ordered', newFoodOrdered);
    } catch(error) {
        console.log(error);
    }
}
    }
    
}

export const deleteFoodOrdered = async (entry: string) => {

}

export const deleteRestaurant = async (restaurantId: string) => {
    console.log('function to delete restaurant record in database')
}
