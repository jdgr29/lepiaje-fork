// import { DateRange } from "react-day-picker";
import { PriceDetails } from "@/types";

interface DateRange {
    from: string | null | Date;
    to: string | null | Date;
}

export function calculate_price(dates: DateRange | null, basePricePerNight: number, pricePerAdditionalGuest: number, totalGuests: number): PriceDetails {
    const checkInDate = new Date(dates?.from || "");
    const checkOutDate = new Date(dates?.to || "");
    const msPerNight = 1000 * 60 * 60 * 24; // This calculates how many milliseconds it takes to complete a whole day
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / msPerNight);

    // The first guest is the booker, so we start counting additional guests from the second one
    const pricePerNight = basePricePerNight;
    const pricePerGuest = totalGuests > 1 ? (totalGuests - 1) * pricePerAdditionalGuest : 0;

    const totalPrice = nights * (pricePerNight + pricePerGuest);

    return {
        nights,
        pricePerNight,
        pricePerGuest,
        totalGuests,
        totalPrice
    };
}
