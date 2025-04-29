import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// You CANNOT import `auth` here.

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token")?.value
    || request.cookies.get("__Secure-next-auth.session-token")?.value;

  if (!sessionToken) {
    // No session token → redirect to sign-in page
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Session token exists → allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/account/:path*"], // protected routes
};
