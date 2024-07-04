import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.JWT_SECRET });
  if (!token) return NextResponse.redirect(new URL("/login", request.url));
  switch (token.role) {
    case "admin":
        if (!request.nextUrl.pathname.startsWith('/admin')) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      break;
    case 'employee':
      console.log(request.nextUrl.pathname, 'path');
      if (!request.nextUrl.pathname.startsWith('/employee')) {
        return NextResponse.redirect(new URL('/employee', request.url));
      }
      break;
    default:
      return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|images).*)",
  ],
};