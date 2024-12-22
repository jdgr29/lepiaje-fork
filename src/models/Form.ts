import { Schema, model } from "mongoose";

const formSchema = new Schema({
    name: {
        type:String,
        required:[true, "name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true, "email is required"],
        trim:true
    },
    phone:{
        type:String,
        required:[true, "phone is required"],
        trim: true,
    },
    message: {
        type:String,
        required:[true, "Message is required"],
        trim: true,
        maxlength:[500, "message cannot exceed 500 characters"] //TODO this can be adjustable
    },
    submittedAt: {
        type:Date,
        default:Date.now()
    }
},{timestamps:true});

export default model("Purchases", formSchema);