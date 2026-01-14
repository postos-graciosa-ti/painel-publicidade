'use client'

import { Header } from "@/components/header"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useEffect, useState } from "react"

const yearsOptions = [
  { value: "1", label: "1 ano" },
  { value: "2", label: "2 anos" },
  { value: "3", label: "3 anos" },
  { value: "4", label: "4 anos" },
  { value: "5", label: "5 anos" }
]

export default function HouseTime() {
  const [years, setYears] = useState("")
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchHouseTime = async () => {
      if (!years) return

      setLoading(true)

      try {
        const response = await axios.get(
          `/api/house-time?years=${years}`
        )

        setEmployees(response.data)
      } catch (error) {
        console.error("Erro ao buscar tempo de casa:", error)
        setEmployees([])
      } finally {
        setLoading(false)
      }
    }

    fetchHouseTime()
  }, [years])

  return (
    <>
      <Header />

      <main className="container mx-auto max-w-4xl p-10">
        <h2 className="text-2xl font-semibold mb-6">
          Tempo de casa
        </h2>

        <div className="mb-6">
          <Label>Tempo mínimo (anos)</Label>

          <select
            className="mt-2 w-full border rounded-md p-2"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          >
            <option value="">Selecione</option>

            {yearsOptions.map((y) => (
              <option key={y.value} value={y.value}>
                {y.label}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p className="text-sm text-muted-foreground">
            Carregando colaboradores...
          </p>
        )}

        {!loading && employees.length === 0 && years && (
          <p className="text-sm text-muted-foreground">
            Nenhum colaborador encontrado.
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

              <span className="text-sm text-muted-foreground">
                Admitido em{" "}
                {new Date(employee.admission_date).toLocaleDateString("pt-BR")}
              </span>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
