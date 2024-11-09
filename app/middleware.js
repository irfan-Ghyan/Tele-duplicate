// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAuthenticated = request.cookies.get('isAuthenticated') === 'true';

  if (!isAuthenticated && request.nextUrl.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard'],
};
