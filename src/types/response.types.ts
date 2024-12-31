export interface HttpResponseType {
    status: number,
    error: boolean,
    errorDetails: string | null,
    message: string | object
}


