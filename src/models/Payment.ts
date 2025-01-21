import mongoose, { Schema, model } from "mongoose";
import { Payment } from "@/types";

const paymentSchema = new Schema<Payment>(
    {
        bookingId: {
            type: String,
            ref: "bookings",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "completed", "failed"], // Possible payment statuses
        },
        transactionId: {
            type: String,
            required: false,
            trim: true,
        },
        additionalDetails: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.payments || model("payments", paymentSchema);
