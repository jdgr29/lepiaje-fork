import { ResponseHandler } from "@/helpers/response_handler";
import { HttpStatusCode } from "@/enums";
import { connection } from "@/config/db";
import Stripe from 'stripe';
import Payment from "@/models/Payment";
import Log from "@/models/Log";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
const responseHandler = new ResponseHandler();
export async function POST(req: Request) {
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

        const payload = await req.text()
        const stripeHeader = req.headers.get("stripe-signature")!
        // eslint-disable-next-line
        let event: any = Stripe.webhooks.constructEvent(
            payload,
            stripeHeader,
            webhookSecret
        );
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded(paymentIntent);

                const paymentObject = {
                    amount: paymentIntent.amount / 100,
                    status: paymentIntent.status,
                    bookerEmail: paymentIntent.metadata.bookerEmail,
                    transactionId: paymentIntent.id
                }
                const payment = await new Payment(paymentObject);
                await payment.save();
                break;
            case 'payment_method.attached':
                const paymentMethod = event.data.object;
                console.log("payment method used", paymentMethod)
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached(paymentMethod);
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        return responseHandler.respond({
            status: HttpStatusCode.OK,
            message: "webhook working correctly. Payment saved",
            errorDetails: "N/A",
            error: false,
        })
    } catch (err) {
        console.log("general error in webhook end point", err, "stringify", JSON.stringify(err));
        const logErrorToDb = new Log({
            endpoint: "api/payment",
            message: "something failed submitted a payment in the webhook",
            requestData: JSON.stringify(err),
            occurredAt: new Date(),
            method: "POST"

        })
        await logErrorToDb.save()
        return responseHandler.respond({
            status: HttpStatusCode.INTERNAL_SERVER,
            error: true,
            errorDetails: `${JSON.stringify(err)}`,
            message: "something has failed with the webhook"
        })
    }

}