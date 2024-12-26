import mongoose, { Schema, model } from "mongoose";
import { BookingType } from "@/types";

const bookingSchema = new Schema<BookingType>(
    {
        propertyName: {
            type: String,
            required: true
        },
        checkIn: {
            type: Date,
            required: true,
        },
        checkOut: {
            type: Date,
            required: true,
        },
        totalPaid: {
            type: Number,
            required: true
        },
        numberOfGuests: {
            type: Number,
            required: true,
        },
        guestName: {
            type: String,
            required: true,
        },
        guestEmail: {
            type: String,
            required: true,
        },
        guestPhone: {
            type: String,
            required: false,
        },
        dateOfBooking: {
            type: Date,
            default: Date.now(),
        },
    }, { timestamps: true }
)

export default mongoose.models.Booking || model('Booking', bookingSchema);