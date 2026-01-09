import nodemailer from "nodemailer"

export async function POST(req) {
  try {
    const { to, subject, text, html, attachments } = await req.json()

    if (!to || !subject || (!text && !html)) {
      return new Response(
        JSON.stringify({ error: "Parâmetros obrigatórios ausentes." }),
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
      attachments: attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
        encoding: a.encoding || "base64",
      })),
    }

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "E-mail enviado com sucesso." }),
      { status: 200 }
    )

  } catch (error) {
    console.error("Erro ao enviar e-mail:", error)

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    )
  }
}
