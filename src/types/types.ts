export interface ListItem {
  value: string | number,
  label: string,
}

export interface Cuisine {
  cuisine_id: number;
  name: string;
}

export interface PhotoData {
  imagePath: string;
  imageFile: File | undefined;
  orderedAt: string;
  location: {
    GPSLatitude: [number, number, number];
    GPSLatitudeRef: string;
    GPSLongitude: [number, number, number];
    GPSLongitudeRef: string;
  };
}

export interface RecordData {
  restaurantName: string;
  cuisine: ListItem;
  rating: number;
  comment: string;
  foodName: string;
  tags: string[];
  address: string;
  photoData: PhotoData;
}

export interface FoodOrdered {
  food_id: string;
  user_id: string;
  restaurant_id: number;
  name: string;
  cuisine_id: number;
  ordered_at: string;
  rating: number;
  comment: string;
  address: string;
  image_path: string | null;
  tags: string[];
  date_updated: string;
  date_created: string;
}

export interface FoodOrderedExtended extends FoodOrdered {
  restaurant_name: string;
  cuisine: string;
}

export interface Restaurant {
  restaurant_id: number;
  name: string;
  cuisine: string;
  cuisine_id: number;
  address: string;
  date_updated: string;
  date_created: string;
};

export interface Leckerlog {
  restaurant_id: string;
  name: string;
  cuisine: string;
  cuisine_id: number;
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
  rating: 0,
  comment: '',
  foodName: '',
  tags: [],
  photoData: {
    orderedAt: '',
    imagePath: '',
    imageFile: undefined,
    location: {
      GPSLatitude: [37, 5, 59.46],
      GPSLatitudeRef: 'W',
      GPSLongitude: [8, 40, 17.11],
      GPSLongitudeRef: 'N'
    }
  }
}

export type SortBy = 'last_ordered' | 'best_rated' | 'alphabetically_asc';

export type GroupBy = 'cuisines' | 'restaurants' | 'tags'

export interface FilterItem {
  label: string;
  value: SortBy | GroupBy;
}