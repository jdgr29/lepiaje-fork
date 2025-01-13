import { BookingType } from "@/types";

export const submit_new_booking = async (bookingData: BookingType): Promise<{ error: boolean, message: string }> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();
        if (response.status !== 201) {
            throw new Error(`Something wrong happened while booking the property ${JSON.stringify(response)} ${JSON.stringify(result)}`)
        }

        if (!result) {
            return {
                error: true,
                message: `something went wrong while booking the property ${JSON.stringify(result)} ${JSON.stringify(response)}`,
            }
        }

        return {
            error: false,
            message: 'booking was saved!'
        }
    } catch (err) {
        return {
            error: true,
            message: `Something went wrong saving the new booking ${JSON.stringify(err)}`
        }
    }
}