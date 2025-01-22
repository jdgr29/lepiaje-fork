import { BookingType, HttpResponseType } from "@/types";
import { notifyAdmin } from "./notify_admin";
import { Email } from "@/enums";

export const submit_new_booking = async (bookingData: BookingType): Promise<{ error: boolean, message: string, errorDetails: string }> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });

        const { message, error, errorDetails }: HttpResponseType = await response.json();

        if (response.status !== 201 || error) {
            return {
                error: true,
                message: `something went wrong while booking the property ${JSON.stringify(errorDetails)} ${JSON.stringify(message)}`,
                errorDetails: errorDetails || "N>A",
            }
        }



        const emailSent = await notifyAdmin(message, Email.BOOKING)
        if (emailSent.error) {
            console.log("something went wrong sending the email", emailSent)
        }
        return {
            error: false,
            message: 'booking was saved!',
            errorDetails: emailSent.message
        }
    } catch (err) {
        return {
            error: true,
            message: `Something went wrong saving the new booking ${JSON.stringify(err)}`,
            errorDetails: JSON.stringify(err),
        }
    }
}