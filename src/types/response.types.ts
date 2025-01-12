import { EmailType } from "./email.types";

export interface HttpResponseType {
    status: number,
    error: boolean,
    errorDetails: string | null,
    message: string | EmailType
}



