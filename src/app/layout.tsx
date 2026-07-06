import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TeamHub',
  description: 'Interne Unternehmensplattform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  )
}
