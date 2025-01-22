import { Directions } from "./directions.types";


export type Property = {
    uuid: string,
    id: number;
    name: string;
    location_name: string;
    price_per_night: number;
    description: string;
    room_features?: string[],
    rooms: string[],
    features: string[];
    images?: string[];
    location: Directions;
    booking_dot_com_url_address?: string,
    airbnb_url_address?: string
    google_maps_url_address: string
    submittedAt?: Date
};

