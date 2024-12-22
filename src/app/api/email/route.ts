import { NextResponse } from "next/server";

export async function GET(request:Request) {
<<<<<<< HEAD
    console.log("route working as expected", process.env.DB_CONNECTION_STRING);
=======
    console.log("route working as expected", request);
>>>>>>> main
    return NextResponse.json({data: {
        text:"hello world", 
        error:false,
    }}, {status:200, statusText:"ok"});
}
