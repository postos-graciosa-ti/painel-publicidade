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
    if (!password.trim()) {
      Swal.fire({
        title: "Atenção",
        text: "Digite a senha",
        icon: "warning",
      })
      return
    }

    try {
      setLoading(true)
      console.log('Enviando login...')

      const response = await axios.post("/api/login", { 
        password: password.trim() 
      })

      console.log('Resposta do login:', response.data)

      if (response.status === 200) {
        Swal.fire({
          title: "Sucesso!",
          text: "Login realizado com sucesso",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          router.replace("/home")
        })
      }
    } catch (error) {
      console.error('Erro completo:', error)
      
      let message = "Erro inesperado ao realizar login"
      
      if (error.response) {
        // Erro do servidor
        message = error.response.data?.message || message
        console.log('Status:', error.response.status)
        console.log('Resposta:', error.response.data)
      } else if (error.request) {
        // Sem resposta do servidor
        message = "Servidor não respondeu. Verifique sua conexão."
      }
      
      Swal.fire({
        title: "Erro",
        text: message,
        icon: "error",
        confirmButtonText: "Tentar novamente"
      })
    } finally {
      setLoading(false)
    }
  }

  // Adiciona submit com Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      onSubmit()
    }
  }

  return (
    <div className="container mx-auto max-w-md">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-2">
              Painel Publicidade | Postos Graciosa
            </h4>
            <span className="text-gray-600">
              Painel de controle para gerenciamento de publicidade
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="password" className="block text-gray-700 mb-2">
                Senha de acesso
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                placeholder="Digite sua senha"
                className="w-full"
                autoComplete="current-password"
              />
            </div>

            <Button
              type="button"
              className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Spinner className="mr-2" />
                  Entrando...
                </div>
              ) : (
                "Entrar"
              )}
            </Button>

            {/* Dica para teste */}
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
              <p className="font-medium">Para teste rápido:</p>
              <p>Senha atual: <code className="bg-yellow-100 px-1 rounded">admin123</code></p>
              <p className="text-xs mt-1">(Edite em app/api/login/route.js)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}