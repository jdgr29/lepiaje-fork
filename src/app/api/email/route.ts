import { Resend } from "resend";
import { ResponseHandler } from "@/helpers/response.handler";
import { HttpStatusCode } from "@/enums";
import { EmailType } from "@/types/email.types";

const resend = new Resend(process.env.RESEND_API_KEY);
// const emailFrom = process.env.DOMAIN_EMAIL_SENDER //TODO replace with real email in env variable when available from a domain
const responseHandler = new ResponseHandler();
const emailFrom = "delivered@resend.dev"

export async function POST(request: Request) {
    try {
        if (!resend) {
            return responseHandler.respond({
                status: HttpStatusCode.BAD_REQUEST,
                message: "There is no Resend api key",
                errorDetails: "The api key of resend has not loaded, has expired or is simply not present in this request",
                error: true
            });
        }
        if (!emailFrom) {
            return responseHandler.respond({
                status: HttpStatusCode.BAD_REQUEST,
                message: "There is no email present in the environment to send emails",
                errorDetails: "There is no email, or it is invalid in the environment variables",
                error: true
            });
        }
        const emailData: EmailType = await request.json();

        if (!emailData.message) {
            return responseHandler.respond({ error: true, message: "a message is necessary for this email", status: HttpStatusCode.BAD_REQUEST, errorDetails: "no error details" })
        }

        if (!emailData.name) {
            return responseHandler.respond({ error: true, message: "a name is necessary for this email", status: HttpStatusCode.BAD_REQUEST, errorDetails: "no error details" })
        }

        if (!emailData.email) {
            return responseHandler.respond({ error: true, message: "an email is necessary for sending an email", status: HttpStatusCode.BAD_REQUEST, errorDetails: "no error details" })
        }

        //TODO create a react component to pass necessary client information
        const { data, error } = await resend.emails.send({
            from: emailFrom || "someemailplaceholder@gmail.com",
            to: ['juandaniel9619@gmail.com'],
            subject: "Hello world",
            html: "<div><p>hello from Le Piaje this is an email</p></div>",//TODO create nice looking templates maybe using react

        });

        if (error) {
            return responseHandler.respond({
                message: "something has failed while sending the email",
                error: true,
                errorDetails: JSON.stringify(error),
                status: HttpStatusCode.INTERNAL_SERVER
            })
        }

        return responseHandler.respond({ error: false, errorDetails: "there were no errors", message: data?.id ?? "no id", status: HttpStatusCode.OK })
    } catch (err) {
        return responseHandler.respond({
            error: true,
            message: "Something has gone wrong, please check logs and more information at 'errorDetails' object",
            errorDetails: JSON.stringify(err),
            status: HttpStatusCode.INTERNAL_SERVER
        })
    }
}
