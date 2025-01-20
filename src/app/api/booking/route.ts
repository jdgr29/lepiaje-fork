import Room from "@/models/Room";
import Bed from "@/models/Bed"; // Import your Bed model directly
import Booking from "@/models/Booking";
import Property from "@/models/Property";
import { ResponseHandler } from "@/helpers/response_handler";
import { HttpStatusCode } from "@/enums";
import { connection } from "@/config/db";
import { BookingType, Guests, Occupant, Property as PropertyType } from "@/types";
import { checkBedsAvailability } from "@/utils/check_beds_availability";


export async function POST(request: Request) {
    const responseHandler = new ResponseHandler();
    try {
        const db = await connection();
        if (!db) {
            return responseHandler.respond({
                error: true,
                errorDetails: db ?? 'no details please check logs',
                message: 'the db connection could not be established',
                status: HttpStatusCode.INTERNAL_SERVER
            });
        }

        const booking: BookingType = await request.json();
        if (!booking.checkIn || !booking.checkOut || !booking.bookerEmail || !booking.numberOfGuests || !booking.totalPaid || !booking.propertyName) {

            console.log("what is cooking here", booking);
            return responseHandler.respond({
                error: true,
                errorDetails: `Missing required fields in booking ${JSON.stringify(booking)}`,
                message: "Missing required booking details",
                status: HttpStatusCode.BAD_REQUEST
            });
        }

        const property = await Property.findOne({ id: booking.propertyId });
        if (!property) {

            return responseHandler.respond({
                error: true,
                errorDetails: `Property with ID ${booking.propertyId} not found`,
                message: "Property not found",
                status: HttpStatusCode.NOT_FOUND
            });
        }

        const allGuests: Guests[] = [{ name: booking.bookerName || "No guest name", gender: booking.bookerGender, check_in: booking.checkIn, check_out: booking.checkOut }, ...booking.guests];

        let roomAvailable = false;

        if (property.id === 1) {
            const property_rooms_strings_uuid_array = property.rooms;
            if (!property_rooms_strings_uuid_array) {
                throw new Error("Unable to retrieve room UUIDs for the property.");
            }


            const mixedRooms = await Room.find({
                uuid: { $in: property_rooms_strings_uuid_array },
                gender: "mixed",
            });

            if (!mixedRooms || mixedRooms.length === 0) {
                throw new Error("No mixed rooms found for the property.");
            }


            const mixedRoomBeds = await Bed.find({
                uuid: { $in: mixedRooms.flatMap((room) => room.beds) },
            });

            if (!mixedRoomBeds || mixedRoomBeds.length === 0) {
                throw new Error("No beds found for mixed rooms.");
            }


            const checkInDate = new Date(booking.checkIn);
            const checkOutDate = new Date(booking.checkOut);

            for (const bed of mixedRoomBeds) {
                const isOccupied = bed.occupants.some((occupant: Occupant) => {
                    const existingCheckIn = new Date(occupant.check_in);
                    const existingCheckOut = new Date(occupant.check_out);

                    // Check if the bed is already occupied for the given dates
                    return checkInDate < existingCheckOut && checkOutDate > existingCheckIn;
                });

                if (!isOccupied) {
                    // Add a placeholder occupant to mark the bed as occupied
                    bed.occupants.push({
                        name: "Occupied",
                        gender: "mixed",
                        check_in: booking.checkIn,
                        check_out: booking.checkOut,
                    });

                    // Save the bed with the updated occupants
                    await bed.save();
                    console.log(`Marked bed ${bed.uuid} as occupied for the dates.`);
                }
            }

            // Mark the room as fully occupied
            roomAvailable = true;
        }

        if (property.id === 2) {
            console.log("al centesimo chilometro");
            const property: PropertyType | null = await Property.findOne({ id: 2 });
            if (!property) {

                throw new Error("we couldn't find the property")
            }
            const property_rooms_strings_uuid_array = property.rooms
            if (!property_rooms_strings_uuid_array) {
                throw new Error("we couldnt we the property_rooms_strings_uuid_array of the property rooms")

            }
            const property_rooms = await Room.find({ uuid: { $in: property_rooms_strings_uuid_array } });
            if (!property_rooms) {
                throw new Error("we couldn't get any rooms from rooms schema");

            }
            const property_room_beds_strings_uuid_for_females = property_rooms.find(room => room.gender === "female");
            const property_room_beds_strings_uuid_for_males = property_rooms.find(room => room.gender === "male");

            if (!property_room_beds_strings_uuid_for_females || !property_room_beds_strings_uuid_for_males) {
                throw new Error("we couldn't find the female or male beds uuids")

            }

            const beds_for_female_room = await Bed.find({ uuid: { $in: property_room_beds_strings_uuid_for_females.beds } })
            const beds_for_male_room = await Bed.find({ uuid: { $in: property_room_beds_strings_uuid_for_males.beds } })

            if (!beds_for_female_room || !beds_for_male_room) {
                throw new Error("we couldn't fetch the beds for female room")

            }

            const male_guests = allGuests.filter(guest => guest.gender === "male");
            const female_guests = allGuests.filter(guest => guest.gender === "female");

            let isMaleBedsAvailable = false;
            let isFemaleBedsAvailable = false;

            // Check availability for male guests only if there are male guests

            if (male_guests.length > 0) {
                const { passed } = checkBedsAvailability(beds_for_male_room, booking, male_guests.length);
                isMaleBedsAvailable = passed

            }

            // Check availability for female guests only if there are female guests

            if (female_guests.length > 0) {
                const { passed } = checkBedsAvailability(beds_for_female_room, booking, female_guests.length);
                isFemaleBedsAvailable = passed

            }

            const Beds = await Bed.find();

            if (!Beds || Beds.length === 0) {
                throw new Error("We couldn't find the beds when booking the property, thus, couldn't confirm if it was available for sure.");
            }

            const shouldCheckFemaleBeds = female_guests.length > 0 ? isFemaleBedsAvailable : true;
            const shouldCheckMaleBeds = male_guests.length > 0 ? isMaleBedsAvailable : true;

            if (shouldCheckMaleBeds && shouldCheckFemaleBeds) {
                roomAvailable = true;

                if (roomAvailable) {
                    // Create a list of all guests first
                    const allGuests = [...male_guests, ...female_guests];

                    // Group guests by gender to process male and female rooms separately
                    const groupedGuests = {
                        male: allGuests.filter(guest => guest.gender === "male"),
                        female: allGuests.filter(guest => guest.gender === "female"),
                    };

                    // Define a helper function to assign each guest to a separate bed
                    // eslint-disable-next-line
                    const assignGuestsToRoom = async (targetRoom: any[], guests: Guests[]) => {
                        console.log("target room", targetRoom);
                        console.log("guests", guests);

                        let remainingGuests = [...guests]; // Track unassigned guests

                        // Filter male and female beds
                        const maleBeds = targetRoom.filter((bed) => bed.room_gender === 'male');
                        const femaleBeds = targetRoom.filter((bed) => bed.room_gender === 'female');

                        // Function to check if a bed is occupied on the given dates

                        // eslint-disable-next-line
                        const isBedOccupied = (bed: any, check_in: string | Date, check_out: string | Date) => {
                            // eslint-disable-next-line
                            return bed.occupants.some((o: any) => {
                                // Check if the new check-in or check-out dates overlap with any existing booking
                                const existingCheckIn = new Date(o.check_in);
                                const existingCheckOut = new Date(o.check_out);
                                const newCheckIn = new Date(check_in);
                                const newCheckOut = new Date(check_out);

                                // Overlapping condition: new check-in is before existing check-out and new check-out is after existing check-in
                                return newCheckIn < existingCheckOut && newCheckOut > existingCheckIn;
                            });
                        };

                        // Assign male guests to male beds

                        if (remainingGuests.some(guest => guest.gender === 'male')) {
                            // eslint-disable-next-line
                            for (let bed of maleBeds) {
                                if (remainingGuests.length === 0) break;
                                console.log("remaining Guests jaja --->", remainingGuests)
                                const guest = remainingGuests.find((g) => g.gender === 'male');
                                if (guest && !isBedOccupied(bed, guest.check_in!, guest.check_out!)) {
                                    // Add guest to the bed's occupants array if the dates match
                                    bed.occupants.push({
                                        name: guest.name,
                                        gender: guest.gender,
                                        check_in: guest.check_in,
                                        check_out: guest.check_out,
                                    });

                                    remainingGuests = remainingGuests.filter((g) => g !== guest); // Remove assigned guest from remainingGuests

                                    // Save the bed if updated
                                    await bed.save();
                                    console.log(`Assigned ${guest.name} to male bed ${bed.uuid}`);
                                } else {
                                    console.log(`Bed ${bed.uuid} is occupied on the given dates for guest ${guest?.name}.`);
                                }
                            }
                        }

                        // Assign female guests to female beds

                        if (remainingGuests.some((guest) => guest.gender === 'female')) {
                            // eslint-disable-next-line
                            for (let bed of femaleBeds) {
                                if (remainingGuests.length === 0) break;

                                const guest = remainingGuests.find((g) => g.gender === 'female');
                                if (guest && !isBedOccupied(bed, guest.check_in!, guest.check_out!)) {
                                    // Add guest to the bed's occupants array if the dates match
                                    bed.occupants.push({
                                        name: guest.name,
                                        gender: guest.gender,
                                        check_in: guest.check_in,
                                        check_out: guest.check_out,
                                    });

                                    remainingGuests = remainingGuests.filter((g) => g !== guest); // Remove assigned guest from remainingGuests

                                    // Save the bed if updated
                                    await bed.save();
                                    console.log(`Assigned ${guest.name} to female bed ${bed.uuid}`);
                                } else {
                                    console.log(`Bed ${bed.uuid} is occupied on the given dates for guest ${guest?.name}.`);
                                }
                            }
                        }

                        // If there are remaining guests, log the issue
                        if (remainingGuests.length > 0) {
                            console.log(`Some guests could not be assigned to beds. Remaining guests: ${remainingGuests.length}`);
                        }

                        console.log("Final state of beds:", targetRoom);
                    };
                    // Assign guests to male and female rooms separately
                    await Promise.all([
                        assignGuestsToRoom(beds_for_male_room, groupedGuests.male),
                        assignGuestsToRoom(beds_for_female_room, groupedGuests.female),
                    ]);
                }
            }
        }

        if (!roomAvailable) {
            console.log("no room available breakpoint")
            return responseHandler.respond({
                error: true,
                errorDetails: `No available beds for the requested booking.`,
                message: "Room availability error",
                status: HttpStatusCode.BAD_REQUEST
            });
        }

        const newBooking = new Booking(booking);
        const savedBooking = await newBooking.save();

        if (!savedBooking) {
            return responseHandler.respond({
                error: true,
                errorDetails: ` Something failed while saving the booking ${JSON.stringify(newBooking)} ${JSON.stringify(savedBooking)}`,
                message: "Failed to save booking",
                status: HttpStatusCode.INTERNAL_SERVER
            });
        }

        return responseHandler.respond({
            error: false,
            errorDetails: "N/A",
            message: savedBooking,
            status: HttpStatusCode.CREATED
        });
    } catch (err) {
        console.log("General error in booking route api", err, JSON.stringify(err))
        return responseHandler.respond({
            error: true,
            errorDetails: ` Error details: ${JSON.stringify(err)}`,
            status: HttpStatusCode.INTERNAL_SERVER,
            message: "Something went wrong, please check logs."
        });
    }
}