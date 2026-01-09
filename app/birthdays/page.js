'use client'

import { Header } from "@/components/header"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useEffect, useState } from "react"

const months = [
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" }
]

export default function Birthdays() {
  const [month, setMonth] = useState("")

  const [employees, setEmployees] = useState([])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBirthdays = async () => {
      if (!month) return

      setLoading(true)

      try {
        const response = await axios.get(
          `/api/birthdays?month=${month}`
        )

        setEmployees(response.data)
      } catch (error) {
        console.error("Erro ao buscar aniversariantes:", error)

        setEmployees([])
      } finally {
        setLoading(false)
      }
    }

    fetchBirthdays()
  }, [month])

  return (
    <>
      <Header />

      <main className="container mx-auto max-w-4xl p-10">
        <h2 className="text-2xl font-semibold mb-6">
          Aniversariantes do mês
        </h2>

        <div className="mb-6">
          <Label>Mês</Label>

          <select
            className="mt-2 w-full border rounded-md p-2"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Selecione um mês</option>

            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p className="text-sm text-muted-foreground">
            Carregando aniversariantes...
          </p>
        )}

        {!loading && employees.length === 0 && month && (
          <p className="text-sm text-muted-foreground">
            Nenhum aniversariante encontrado.
          </p>
        )}

        <ul className="space-y-3">
          {employees.map((employee) => (
            <li
              key={employee.id}
              className="border rounded-md p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{employee.name}</p>

                <p className="text-sm text-muted-foreground">
                  {employee.subsidiary_name || "Sem filial"}
                </p>
              </div>

              <span className="text-muted-foreground">
                {new Date(employee.datebirth).toLocaleDateString("pt-BR")}
              </span>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
