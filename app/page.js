'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Swal from "sweetalert2"

export default function Home() {
  const router = useRouter()

  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setLoading(true)

      const response = await axios.post("/api/login", { password })

      if (response.status === 200) {
        router.replace("/home")
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Erro inesperado ao realizar login"

      Swal.fire({
        title: "Erro",
        text: message,
        icon: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center p-10">
        <h4 className="text-2xl mb-2">
          Painel Publicidade | Postos Graciosa
        </h4>
        
        <span className="text-sm">
          Painel de controle para gerenciamento de publicidade
        </span>
      </div>

      <div>
        <Label htmlFor="password" className="mb-2">
          Senha de acesso
        </Label>

        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <Button
          type="button"
          className="px-4 py-2 rounded-md mt-4 w-full"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Entrar"}
        </Button>
      </div>
    </div>
  )
}
