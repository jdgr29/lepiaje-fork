import { NextResponse } from 'next/server';

const usernameENV = process.env.USERNAME!
const passwordENV = process.env.USER_PASSWORD!

export async function POST(request: Request) {
    const body = await request.json();

    // Simulate a database check
    const { username, password } = body;
    if (username === usernameENV && password === passwordENV) {
        const response = NextResponse.json({ success: true });

        // Set the HTTP-only cookie
        response.cookies.set('token', 'valid-token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
        });

        return response;
    }

    return NextResponse.json(
        { success: false, message: 'Invalid username or password' },
        { status: 401 }
    );
}