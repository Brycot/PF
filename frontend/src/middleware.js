import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('authToken');

  if (token === undefined) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  try {
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.NEXT_SECRETORPRIVATEKEY)
    );
    return NextResponse.next();
  } catch (error) {
    console.log('esoy en el error', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*',
};