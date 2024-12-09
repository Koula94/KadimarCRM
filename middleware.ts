import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isTokenValid } from './lib/auth';

const publicPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!token || !isTokenValid(token)) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  if (isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};