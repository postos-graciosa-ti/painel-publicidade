import { NextResponse } from "next/server"
import { query } from "../../lib/db"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)

    const month = Number(searchParams.get("month"))

    if (!month || month < 1 || month > 12) {
      return NextResponse.json({ message: "Mês inválido" }, { status: 400 })
    }

    const employees = await query(
      `
      SELECT 
        e.id,
        e.name,
        e.datebirth,
        s.id   AS subsidiary_id,
        s.name AS subsidiary_name
      FROM employees e
      INNER JOIN subsidiaries s
        ON s.id = e.subsidiarie_id
      WHERE EXTRACT(MONTH FROM e.datebirth) = $1
      ORDER BY EXTRACT(DAY FROM e.datebirth)
      `,
      [month]
    )

    return NextResponse.json(employees)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: "Erro ao buscar aniversariantes" },
      { status: 500 }
    )
  }
}
