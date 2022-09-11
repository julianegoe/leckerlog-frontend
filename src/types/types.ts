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
  date_updated: string;
  date_created: string;
}

export interface LastUpdatedFood extends FoodOrdered {
  restaurant_name: string;
}

export interface Restaurant {
  restaurant_id: number;
  name: string;
  cuisine: string;
  cuisine_id: number;
  date_updated: string;
  date_created: string;
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

export type View = 'cuisines' | 'last_ordered'

export interface FilterItem {
  label: string;
  value: View;
}