export interface ListItem {
    value: string,
    label: string,
}

export interface Cuisine {
  cuisine_id: string;
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
  tags: string[];
  address: string;
}

export interface FoodOrdered {
  food_id: string;
  name: string;
  cuisine_id: string;
  ordered_at: string;
  rating: number;
  comment: string;
  image_path: string | null;
  tags: string[];
  date_updated: string;
  date_created: string;
}

export interface Restaurant {
  restaurant_id: string;
  name: string;
  cuisine: string;
  cuisine_id: string;
  address: string;
  date_updated: string;
  date_created: string;
};

export interface Leckerlog {
  restaurant_id: string;
  name: string;
  cuisine: string;
  cuisine_id: string;
  address: string;
  date_updated: string;
  date_created: string;
  food_ordered: FoodOrdered[];
}


export const INPUT_DEFAULT_VALUES: RecordData = {
    restaurantName: '',
    address: '',
    cuisine: {
      value: '0',
      label: '',
    },
    ordered_at: '',
    rating: 0,
    comment: '',
    foodName: '',
    image_path: null,
    tags: [],
  }

export type SortBy = 'last_ordered' | 'best_rated' | 'alphabetically_asc';

export type GroupBy = 'cuisines' | 'restaurants' | 'tags'

export interface FilterItem {
  label: string;
  value: SortBy | GroupBy;
}