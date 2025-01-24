import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl; // Get the current path
    const token = request.cookies.get('token'); // Example: Authentication token

    console.log("Token present?", token);

    // Protect /admin/auth and its subroutes
    if (pathname.startsWith('/admin/auth') && !token) {
        // Redirect to /admin (login page) if not authenticated
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Allow access
    return NextResponse.next();
}

// Apply middleware only to /admin/auth and its subroutes
export const config = {
    matcher: ['/admin/auth/:path*'], // Matches /admin/auth and its subroutes
};
