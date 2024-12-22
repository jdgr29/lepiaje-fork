import { NextResponse } from "next/server";

export async function GET(request:Request) {
    console.log("route working as expected");
    return NextResponse.json({data: {
        text:"hello world", 
        error:false,
    }}, {status:200, statusText:"ok"});
}
