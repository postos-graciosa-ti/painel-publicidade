import { query } from "@/app/lib/db"
import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)

    const years = Number(searchParams.get("years"))

    if (!years || years < 1 || years > 5) {
      return NextResponse.json(
        { message: "Tempo de casa inválido" },
        { status: 400 }
      )
    }

    const employees = await query(
      `
      SELECT
        e.id,
        e.name,
        e.admission_date,
        s.id   AS subsidiary_id,
        s.name AS subsidiary_name
      FROM employees e
      INNER JOIN subsidiaries s
        ON s.id = e.subsidiarie_id
      WHERE
        AGE(CURRENT_DATE, e.admission_date) >= MAKE_INTERVAL(years => $1)
        AND e.employee_status_id IN (1, 3)
      ORDER BY e.admission_date
      `,
      [years]
    )

    return NextResponse.json(employees)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: "Erro ao buscar tempo de casa" },
      { status: 500 }
    )
  }
}
