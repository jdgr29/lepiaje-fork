import { Property as PropertyType } from "@/types";
import { connection } from "@/config/db";
import Property from "@/models/Property";

export async function fetch_property(propertyId: number): Promise<PropertyType | null> {
    try {
        const db = await connection();
        const result: PropertyType | null = await Property.findOne({ id: propertyId });
        if (!db) {
            throw new Error(`error while connecting to db ${db} ${JSON.stringify(db)}`);
        }
        if (!result) {
            throw new Error(`error while fetching db data for property ${result} ${JSON.stringify(result)}`);
        }

        return result;


    } catch (err) {
        console.log("error fetching property data at fetch_property function ", JSON.stringify(err), err)
        return null
    }
}