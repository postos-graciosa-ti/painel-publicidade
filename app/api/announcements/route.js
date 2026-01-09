import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { query } from "@/app/lib/db"

export async function POST(req) {
  try {
    const formData = await req.formData()

    const title = formData.get("title")
    const body = formData.get("body")
    const files = formData.getAll("attachments")

    if (!title || !body) {
      return NextResponse.json(
        { message: "Título e mensagem são obrigatórios" },
        { status: 400 }
      )
    }

    // Buscar emails dos funcionários
    const employees = await query(
      "SELECT email FROM employees WHERE email IS NOT NULL"
    )

    if (!employees.length) {
      return NextResponse.json(
        { message: "Nenhum funcionário com e-mail cadastrado" },
        { status: 400 }
      )
    }

    const recipients = employees.map(e => e.email)

    // Converter anexos para o Nodemailer
    const attachments = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer())

        return {
          filename: file.name,
          content: buffer,
          contentType: file.type,
        }
      })
    )

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Painel Publicidade" <${process.env.SMTP_USER}>`,
      bcc: recipients, // ⚠️ usa BCC
      subject: title,
      text: body,
      attachments,
    })

    return NextResponse.json({
      message: "Comunicado enviado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao enviar comunicado:", error)

    return NextResponse.json(
      { message: "Erro interno ao enviar comunicado" },
      { status: 500 }
    )
  }
}
