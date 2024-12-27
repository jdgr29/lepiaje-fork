import { NextResponse } from "next/server";
import { HttpResponseType } from "@/types";

export class ResponseHandler {
    constructor() { }
    respond = (response: HttpResponseType) => {
        return NextResponse.json({
            error: true,
            errorDetails: response.errorDetails,
            message: response.message
        }, { status: response.status });

    }
}