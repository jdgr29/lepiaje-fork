import { Bed, BookingType } from "@/types";

export function checkBedsAvailability(beds: Bed[], booking: BookingType, amountOfGuests: number): { passed: boolean, availableBeds: number } {
    const { checkIn, checkOut } = booking;
    if (!checkIn || !checkOut || !amountOfGuests) {
        console.log("check-in, check-out, and guests are necessary; one of the three is missing or is undefined");
        return { passed: false, availableBeds: 0 };
    }

    let availableBeds = 0;

    beds.forEach((bed) => {
        // Check if the bed is available for the requested booking period
        const isBedAvailable = bed.occupants.every((occupant) => {
            const occupantCheckIn = new Date(occupant.check_in);
            const occupantCheckOut = new Date(occupant.check_out);

            const isAvailable = (new Date(checkOut).setHours(0, 0, 0, 0) <= occupantCheckIn.setHours(0, 0, 0, 0)) ||
                (new Date(checkIn).setHours(0, 0, 0, 0) >= occupantCheckOut.setHours(0, 0, 0, 0));

            return isAvailable;
        });

        if (isBedAvailable) {
            availableBeds++;
        }
    });

    // console.log(`Total available beds: ${availableBeds}`); // leaving this comment in case we need it quickly in the future to debug
    // console.log(`Guests requested: ${amountOfGuests}`);
    // console.log("is it truly false?", availableBeds >= amountOfGuests)

    return { passed: availableBeds >= amountOfGuests, availableBeds }
}