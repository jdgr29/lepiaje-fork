import { NextResponse } from "next/server";

//TODO this route will handle stripe payments along with notifications via email
export default async function POST(req: Request) {
    return NextResponse.json({ data: "everything good" }, { status: 200 })
}

