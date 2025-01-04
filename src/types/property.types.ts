import { Directions } from "./directions.types";


export type Property = {
    id: string;
    name: string;
    location_name: string;
    price: number;
    description: string;
    rooms: string[],
    features: string[];
    images: string[];
    location: Directions;
    booking_dot_com?: string,
    airbnb?: string
    google_maps_url: string
};

