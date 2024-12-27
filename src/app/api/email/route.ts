import { Resend } from "resend";
import { ResponseHandler } from "@/helpers/response.handler";
import { HttpStatusCode } from "@/enums";
import { EmailType } from "@/types/email.types";

const resend = new Resend(process.env.RESEND_API_KEY);
const emailFrom = process.env.DOMAIN_EMAIL_SENDER
const responseHandler = new ResponseHandler();

export async function POST(request: Request) {
    try {
        if (!resend) {
            responseHandler.respond({
                status: HttpStatusCode.BAD_REQUEST,
                message: "There is no Resend api key",
                errorDetails: "The api key of resend has not loaded, has expired or is simply not present in this request",
                error: true
            });
        }
        if (!emailFrom) {
            responseHandler.respond({
                status: HttpStatusCode.BAD_REQUEST,
                message: "There is no email present in the environment to send emails",
                errorDetails: "There is no email, or it is invalid in the environment variables",
                error: true
            });
        }
        const emailData: EmailType = await request.json();
        console.log("email data", emailData);

        //TODO create a react component to pass necessary client information
        const { data, error } = await resend.emails.send({
            from: emailFrom || "someemailplaceholder@gmail.com",
            to: ['delivered@resend.dev'],
            subject: "Hello world",
            html: "<div><p>hello from Le Piaje</p></div>",//TODO create nice looking templates maybe using react

        });

        if (error) {
            responseHandler.respond({
                message: "something has failed while sending the email",
                error: true,
                errorDetails: JSON.stringify(error),
                status: HttpStatusCode.INTERNAL_SERVER
            })
        }

        responseHandler.respond({ error: false, errorDetails: "there were no errors", message: data?.id ?? "no id", status: HttpStatusCode.OK })
    } catch (err) {
        responseHandler.respond({
            error: true,
            message: "Something has gone wrong, please check logs and more information at 'errorDetails' object",
            errorDetails: JSON.stringify(err),
            status: HttpStatusCode.INTERNAL_SERVER
        })
    }
}
