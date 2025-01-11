import { ResponseHandler } from "@/helpers/response_handler";
import { HttpStatusCode } from "@/enums";
import { connection } from "@/config/db";
import Booking from "../../../models/Booking"
import { BookingType } from "@/types";


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

        if (!booking.checkIn) {
            return responseHandler.respond({
                error: true,
                errorDetails: `there is no check-in date for the booking ${JSON.stringify(booking)}`,
                message: "there is no check in date for the booking",
                status: HttpStatusCode.BAD_REQUEST
            })
        }

        if (!booking.checkOut) {
            return responseHandler.respond({
                error: true,
                errorDetails: `there is no check-Out date for the booking ${JSON.stringify(booking)}`,
                message: "there is no check in date for the booking",
                status: HttpStatusCode.BAD_REQUEST
            })
        }

        // if (!booking.guestEmail) { //TODO activate when dealing with stripe
        //     return responseHandler.respond({
        //         error: true,
        //         errorDetails: `Email was not provided by the user ${JSON.stringify(booking)}`,
        //         message: "Email was not provided by the user on the request",
        //         status: HttpStatusCode.BAD_REQUEST,
        //     })
        // }

        if (booking.guests.length === 0 || String(booking.guests.length) === "0") {
            return responseHandler.respond({
                error: true,
                errorDetails: `there is no guest on the booking ${JSON.stringify(booking)}`,
                message: "there is no guest on the booking",
                status: HttpStatusCode.BAD_REQUEST
            })
        }

        if (!booking.numberOfGuests) {
            return responseHandler.respond({
                error: true,
                errorDetails: `there is no number of guests on the booking ${JSON.stringify(booking)}`,
                message: "there is no number of guests on the booking",
                status: HttpStatusCode.BAD_REQUEST
            })
        }

        if (!booking.totalPaid) {
            return responseHandler.respond({
                error: true,
                errorDetails: `there total amount paid on the booking ${JSON.stringify(booking)}`,
                message: "there total amount paid on the booking",
                status: HttpStatusCode.BAD_REQUEST
            })
        }

        if (!booking.propertyName) {
            return responseHandler.respond({
                error: true,
                errorDetails: `there is no name of property on the booking ${JSON.stringify(booking)}`,
                message: "there is no name of property on the booking",
                status: HttpStatusCode.BAD_REQUEST
            })
        }

        const newBooking = new Booking(booking);
        const savedBooking = await newBooking.save();

        if (!savedBooking) {
            return responseHandler.respond({
                error: true,
                errorDetails: `Something has failed saving the booking to the database ${JSON.stringify(newBooking)} ${JSON.stringify(savedBooking)}`,
                message: "something failed while saving booking to database",
                status: HttpStatusCode.INTERNAL_SERVER
            })
        }

        return responseHandler.respond({
            error: false,
            errorDetails: "N/A",
            message: "booked!",
            status: HttpStatusCode.CREATED
        })

    } catch (err) {
        responseHandler.respond({
            error: true,
            errorDetails: `please check the logs ${JSON.stringify(err)}`,
            status: HttpStatusCode.INTERNAL_SERVER,
            message: "something has gone wrong, please check the object error details for more information"
        })
    }
}

