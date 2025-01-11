import mongoose from "mongoose";
let isConnected = false;

export async function connection() {
    try {
        if (isConnected) {
            console.log("The database is already connected");
            return mongoose.connection;
        }
        const dbconnection = await mongoose.connect(process.env.DB_CONNECTION_STRING!);

        if (dbconnection) {
            isConnected = true;
            console.log("database connected");
        }

        return dbconnection;

        //TODO perhaps add a logger in the future just in case
    } catch (err) {
        throw new Error(`something has failed getting the connection to the database ${err}`)
    }

}