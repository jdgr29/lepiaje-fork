import { NextResponse } from "next/server";
import { connection } from "@/config/db";
import { HttpStatusCode } from "@/enums";
import Form from "@/models/form";
import { FormType } from "@/types";

export async function POST(request: Request) {
    try {
        const db = await connection();
        if (!db) {
            return NextResponse.json({
                error: true,
                errorDetails: db ?? 'no details please check logs',
                message: 'the db connection could not be established'
            }, { status: HttpStatusCode.INTERNAL_SERVER });
        }

        const formData: FormType = await request.json();

        if (!formData) {
            return NextResponse.json({
                error: true,
                errorDetails: formData ?? 'no details please check logs',
                message: 'no form data was found on the request'
            }, { status: HttpStatusCode.BAD_REQUEST });
        }

        if (!formData.name) {
            return NextResponse.json({
                error: true,
                errorDetails: formData.name ?? 'no details please check logs',
                message: '<name> is missing from the formData'
            }, { status: HttpStatusCode.BAD_REQUEST });
        }

        if (!formData.message) {
            return NextResponse.json({
                error: true,
                errorDetails: formData.name ?? 'no details please check logs',
                message: '<message> is missing from the formData'
            }, { status: HttpStatusCode.BAD_REQUEST });
        }

        if (!formData.email) {
            return NextResponse.json({
                error: true,
                errorDetails: formData.email ?? 'no details please check logs',
                message: '<email> is missing from the formData'
            }, { status: HttpStatusCode.BAD_REQUEST });
        }

        const newForm = new Form(formData);

        const savedForm = await newForm.save();

        if (!savedForm) {
            return NextResponse.json({
                error: true,
                errorDetails: savedForm ?? 'no details please check logs',
                message: 'something went wrong when saving the new form to the database'
            }, { status: HttpStatusCode.BAD_REQUEST });
        }

        return NextResponse.json({ error: false, errorDetails: false, message: 'form was submitted succesfully!' }, { status: HttpStatusCode.OK })

    } catch (err) {
        console.log("global error in form route", err)
        return NextResponse.json({
            error: true,
            errorDetails: err ?? 'there are no error details here please check the logs',
            message: "something has failed on this operation please look at the details in the <errorDetails> object",
        }, { status: HttpStatusCode.INTERNAL_SERVER! })
    }


}