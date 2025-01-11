import { DateRange } from "react-day-picker";
import { PriceDetails } from "@/types";

export function calculate_price(dates: DateRange | undefined, basePricePerNight: number, pricePerAdditionalGuest: number, totalGuests: number): PriceDetails {
    const checkInDate = new Date(dates?.from || "");
    const checkOutDate = new Date(dates?.to || "");
    const msPerNight = 1000 * 60 * 60 * 24 //This calculates how many milisecods it takes to complete a whole day it is more accurate this way, though still researching
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / msPerNight);
    const pricePerNight = basePricePerNight;
    const pricePerGuest = totalGuests > 1 ? (totalGuests - 1) * pricePerAdditionalGuest : 0;
    const totalPrice = nights * (pricePerNight + pricePerGuest);

    return {
        nights,
        pricePerNight,
        pricePerGuest,
        totalGuests,
        totalPrice
    }

}