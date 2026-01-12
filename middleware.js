import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  console.log('Middleware executando para:', pathname)

  const publicRoutes = ['/', '/api/login', '/api/sendEmails']

  if (publicRoutes.includes(pathname)) {
    console.log('Rota pública, permitindo acesso')

    return NextResponse.next()
  }

  if (pathname.includes('_next') || pathname.includes('favicon.ico')) {
    return NextResponse.next()
  }

  const sessionToken = request.cookies.get('session_token')?.value

  console.log('Cookie encontrado:', sessionToken)

  if (sessionToken === 'authenticated') {
    console.log('Usuário autenticado, permitindo acesso')

    return NextResponse.next()
  }

  console.log('Não autenticado, redirecionando...')

  const loginUrl = new URL('/', request.url)

  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    '/((?!api/login|_next|favicon.ico).*)',
  ],
}
