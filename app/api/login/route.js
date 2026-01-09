import { NextResponse } from 'next/server'

const APP_PASSWORD = process.env.APP_PASSWORD

const COOKIE_NAME = 'authenticated'

export async function POST(request) {
  try {
    const { password } = await request.json()

    if (password !== APP_PASSWORD) {
      return NextResponse.json(
        { error: 'Senha incorreta' },
        { status: 401 }
      )
    }

    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    )

    response.cookies.set({
      name: COOKIE_NAME,
      value: 'true',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return response

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro no servidor' },
      { status: 500 }
    )
  }
}
