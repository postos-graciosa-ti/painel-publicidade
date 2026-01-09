'use client'

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"

export default function Announcements() {
  const [title, setTitle] = useState("")

  const [body, setBody] = useState("")

  const [attachments, setAttachments] = useState([])

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append("title", title)

      formData.append("body", body)

      Array.from(attachments).forEach((file) => {
        formData.append("attachments", file)
      })

      const response = await axios.post(
        "/api/announcements",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      Swal.fire({
        title: "Sucesso",
        text: response.data.message || "Comunicado enviado com sucesso",
        icon: "success",
      })

      setTitle("")

      setBody("")

      setAttachments([])

      e.target.reset()

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Erro ao enviar comunicado"

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
    <>
      <Header />

      <main className="container mx-auto max-w-3xl p-10">
        <h2 className="text-2xl font-semibold mb-6">
          Enviar comunicado por e-mail
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <Label htmlFor="title" className="mb-2">Título do e-mail</Label>

            <Input
              id="title"
              placeholder="Ex: Aviso importante"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="body" className="mb-2">Mensagem</Label>

            <Textarea
              id="body"
              placeholder="Digite o conteúdo do comunicado..."
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="attachments" className="mb-2">
              Anexos (opcional)
            </Label>

            <Input
              id="attachments"
              type="file"
              multiple
              onChange={(e) => setAttachments(e.target.files)}
              disabled={loading}
            />

            <span className="text-xs text-muted-foreground">
              Você pode anexar um ou mais arquivos.
            </span>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar comunicado"}
          </Button>
        </form>
      </main>
    </>
  )
}
