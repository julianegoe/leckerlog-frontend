export interface ListItem {
    value: number,
    label: string,
}

export interface Cuisine {
  cuisine_id: number;
  name: string;
}

export interface RecordData {
  restaurantName: string;
  cuisine: ListItem;
  ordered_at: string;
  rating: number;
  comment: string;
  foodName: string;
  image_path: string | null;
}

export interface FoodOrdered {
  food_id: number;
  name: string;
  cuisine_id: number;
  ordered_at: string;
  rating: number;
  comment: string;
  image_path: string | null;
  created_at: string;
  updated_at: string;
}
export interface Restaurant {
  restaurant_id: number;
  name: string;
  cuisine: string;
  cuisine_id: number;
  updated_at: string;
  created_at: string;
};

export interface Leckerlog {
  restaurant_id: number;
  name: string;
  cuisine: string;
  cuisine_id: number;
  date_updated: string;
  date_created: string;
  food_ordered: FoodOrdered[];
}


export const INPUT_DEFAULT_VALUES: RecordData = {
    restaurantName: '',
    cuisine: {
      value: 0,
      label: '',
    },
    ordered_at: '',
    rating: 0,
    comment: '',
    foodName: '',
    image_path: null,
  }