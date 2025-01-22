import { EmailType } from "./email.types";
import { Property } from "./property.types";

export interface HttpResponseType {
    status: number,
    error: boolean,
    errorDetails: string | null,
    message: string | EmailType
}

export interface ClientResponseType {
    error: boolean,
    message: string | Property
}


