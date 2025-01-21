import mongoose, { Schema, model } from "mongoose";
import { ErrorLog } from "@/types";

const errorLogSchema = new Schema<ErrorLog>(
    {
        message: {
            type: String,
            required: true,
            trim: true,
        },
        stack: {
            type: String,
            required: false,
        },
        method: {
            type: String,
            required: false,
        },
        endpoint: {
            type: String,
            required: false,
            trim: true,
        },
        requestData: {
            type: String,
            required: false,
        },
        occurredAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.models.errorLogs || model("errorLogs", errorLogSchema);