import { NextResponse } from 'next/server'

const COOKIE_NAME = 'authenticated'

export function middleware(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  const pathname = request.nextUrl.pathname

  const publicPaths = ['/', '/login']

  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  if (token !== 'true') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
