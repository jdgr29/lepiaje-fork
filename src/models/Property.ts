import { Directions, Property as PropertyType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import mongoose, { Schema, model } from "mongoose";

const directionSchema = new Schema<Directions>({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true
    }
})

const propertySchema = new Schema<PropertyType>({
    uuid: {
        type: String,
        required: true,
        trim: true,
        default: String(uuidv4)
    },
    id: {
        type: Number,
        required: true,
    },
    name: {
        required: true,
        type: String,
    },
    location_name: {
        type: String,
        required: true
    },
    price_per_night: {
        required: true,
        type: Number
    },
    description: {
        required: true,
        type: String,
    },
    rooms: [{ type: String, ref: "rooms" }], //Creates a relationship between the rooms and tied them to the property
    features: {
        required: true,
        type: [String],
    },
    images: {
        required: false,
        type: [String]
    },
    location: directionSchema,
    booking_dot_com_url_address: {
        required: false,
        type: String
    },
    airbnb_url_address: {
        type: String,
        required: false,
    },
    google_maps_url_address: {
        required: true,
        type: String
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.models.properties || model("properties", propertySchema);