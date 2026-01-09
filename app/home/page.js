'use client'

import { Header } from "@/components/header"

export default function Home() {
  return (
    <>
      <Header />

      <main className="container mx-auto">
        <div className="flex flex-col items-center justify-center p-10 text-center max-w-2xl mx-auto">
          <h4 className="text-2xl mb-4 font-semibold">
            Painel Publicidade | Postos Graciosa
          </h4>

          <p className="text-sm text-muted-foreground">
            Este painel tem como objetivo facilitar a comunicação interna com os
            funcionários, permitindo a divulgação rápida e eficiente de
            informações relevantes, avisos operacionais e conteúdos
            publicitários. A plataforma centraliza o gerenciamento das mensagens
            exibidas, garantindo uma comunicação clara, organizada e acessível.
          </p>
        </div>
      </main>
    </>
  )
}
