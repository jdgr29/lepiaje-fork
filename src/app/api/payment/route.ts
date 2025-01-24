import { ResponseHandler } from "@/helpers/response_handler";
import { HttpStatusCode } from "@/enums";
import { connection } from "@/config/db";
import Stripe from 'stripe';
import Log from "@/models/Log";
import { BookingType } from "@/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const responseHandler = new ResponseHandler();

export async function POST(req: Request) {
    await connection();
    if (!stripe) {
        return responseHandler.respond({
            status: HttpStatusCode.BAD_REQUEST,
            error: true,
            errorDetails: `something went wrong loading stripe --> ${stripe}`,
            message: "stripe was either null or undefined"
        })
    }

    try {
        const { amount, bookingData, bookerEmail }: { amount: number, bookingData: BookingType, bookerEmail: string } = await req.json();

        if (!amount || !bookingData || !bookerEmail) {
            return responseHandler.respond({
                status: HttpStatusCode.BAD_REQUEST,
                error: true,
                errorDetails: `the amount -> ${amount} is not valid`,
                message: "something went wrong with getting the amount"
            })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount! * 100,
            currency: "eur",
            description: `Payment for booking - ${amount} EUR`,
            metadata: {
                amount: amount! * 100,
                bookerEmail,
            },
        });

        if (!paymentIntent) {
            return responseHandler.respond({
                status: HttpStatusCode.BAD_REQUEST,
                message: "something went wrong creating payment intent",
                errorDetails: `failed to create payment intent, payment intent is ${paymentIntent}`,
                error: true
            })
        }

        return responseHandler.respond({
            status: HttpStatusCode.OK,
            error: false,
            errorDetails: "n/a",
            message: paymentIntent.client_secret!
        })
    } catch (error) {

        console.log("error in creating a payment intent and charging", error, JSON.stringify(error))
        const logErrorToDb = new Log({
            endpoint: "api/payment",
            message: "something failed submitted a payment",
            requestData: JSON.stringify(error),
            occurredAt: new Date(),
            method: "POST"

        })
        await logErrorToDb.save()
        return responseHandler.respond({
            status: HttpStatusCode.INTERNAL_SERVER,
            message: "something went wrong with the payment route",
            errorDetails: `something went wrong with creating a stripe payment. Details --> ${error} stringify ---> ${JSON.stringify(error)}`,
            error: true
        })
    }
}


