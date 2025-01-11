import { NextResponse } from "next/server";

//TODO this route will handle stripe payments along with notifications via email
export async function POST(req: Request) {
    console.log("req", req)
    return NextResponse.json({ data: "everything good" }, { status: 200 })
}
