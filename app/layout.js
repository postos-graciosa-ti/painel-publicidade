import "./globals.css"

export const metadata = {
  title: "Painel Publicidade | Postos Graciosa",
  description: "Painel de controle para gerenciamento de publicidade",
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}
