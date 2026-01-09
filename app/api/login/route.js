import { NextResponse } from "next/server"

export async function POST(req) {
  const { password } = await req.json()

  if (password !== "123456") {
    return NextResponse.json(
      { message: "Senha incorreta" },
      { status: 401 }
    )
  }

  return NextResponse.json(
    { message: "Login realizado com sucesso" },
    { status: 200 }
  )
}
