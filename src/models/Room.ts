
import { v4 as uuidv4 } from "uuid";
import mongoose, { Schema, model } from "mongoose";
import { RoomType } from "@/types/room.types";

const roomSchema = new Schema<RoomType>({
    uuid: {
        type: String,
        required: true,
        trim: true,
        default: String(uuidv4)
    },
    beds: [{ type: String, ref: "beds" }],
    name: {
        required: true,
        type: String
    },
    gender: {
        required: true,
        type: String
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.models.rooms || model("rooms", roomSchema);