'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex items-center justify-between py-4">
        <span className="text-lg font-semibold">
          Painel Publicidade
        </span>

        <nav className="flex items-center gap-6">
          <Link
            href="/home"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Início
          </Link>

          <Link
            href="/announcements"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Comunicados
          </Link>

          <Link
            href="/birthdays"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Aniversariantes
          </Link>

          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              Sair
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
