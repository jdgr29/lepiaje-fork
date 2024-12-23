import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const purchaseSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true,
            trim: true,
            default: uuidv4
        },
        product_name: {
            type: String,
            required: true,
            trim: true,
        },
        product_id: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
            trim: true,
        },
        total: {
            type: Number,
            required: true,
            trim: true
        },
        client_email: {
            type: String,
            required: true,
            trim: true,
        },
        client_number: {
            type: Number,
            required: false,
            trim: true,
        },
        stripe_id: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
)

export default model("Purchases", purchaseSchema);