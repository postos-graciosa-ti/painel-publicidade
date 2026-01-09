import { NextResponse } from 'next/server'

const COOKIE_NAME = 'authenticated'

export function middleware(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value

  const publicPaths = [
    '/',
  ]

  const currentPath = request.nextUrl.pathname

  if (publicPaths.includes(currentPath)) {
    return NextResponse.next()
  }

  const isPublicSubRoute = publicPaths.some(path =>
    currentPath.startsWith(path + '/')
  )

  if (isPublicSubRoute) {
    return NextResponse.next()
  }

  if (!token || token !== 'true') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
