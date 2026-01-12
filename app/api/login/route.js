import { NextResponse } from 'next/server'

const CORRECT_PASSWORD = process.env.APP_PASSWORD

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(request) {
  try {
    const data = await request.json()
    
    const { password } = data

    console.log('Tentativa de login com senha:', password)

    if (!password) {
      return NextResponse.json(
        { message: 'Digite a senha' },
        { status: 400 }
      )
    }

    if (password !== CORRECT_PASSWORD) {
      console.log('Senha incorreta. Esperada:', CORRECT_PASSWORD, 'Recebida:', password)
    
      return NextResponse.json(
        { message: 'Senha incorreta. Tente novamente.' },
        { status: 401 }
      )
    }

    console.log('Login bem-sucedido!')

    const response = NextResponse.json(
      { 
        success: true,
        message: 'Login realizado com sucesso!'
      },
      { status: 200 }
    )

    response.cookies.set({
      name: 'session_token',
      value: 'authenticated',
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 8,
      path: '/',
    })

    return response

  } catch (error) {
    console.error('ERRO no login:', error)

    return NextResponse.json(
      { message: 'Erro no servidor. Tente novamente.' },
      { status: 500 }
    )
  }
}
