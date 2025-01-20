import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { PurchaseType } from "@/types";

const purchaseSchema = new Schema<PurchaseType>(
    {
        uuid: {
            type: String,
            required: true,
            trim: true,
            default: uuidv4
        },
        amountOfProduct: {
            required: true,
            trim: true,
            type: Number
        },
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        productId: {
            type: String,
            required: true,
            trim: true,
        },
        amountPaid: {
            type: Number,
            required: true,
            trim: true,
        },
        clientEmail: {
            type: String,
            required: true,
            trim: true,
        },
        clientNumber: {
            type: Number,
            required: false,
            trim: true,
        },
        purchasedOn: {
            required: true,
            trim: true,
            type: Date,
            default: Date.now()
        },
        stripeId: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
)

export default mongoose.models.purchases || model("purchases", purchaseSchema);