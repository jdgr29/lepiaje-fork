//TODO add db connection to store forms, payments|orders 
import mongoose from "mongoose";

export async function connection() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING!);
        //TODO perhaps add a logger in the future just in case
    } catch (err) {
        throw new Error(`something has failed getting the connection to the database ${err}`)
    }

}