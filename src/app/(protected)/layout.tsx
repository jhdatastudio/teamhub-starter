import Nav from '@/components/nav'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 3.2a — Auth-Guard aktivieren (ca. 10 Min)
 * ═══════════════════════════════════════════════════════════
 *
 * An Tag 1+2 arbeiten wir ohne Login (Demo-User unten).
 * Sobald Auth.js konfiguriert ist (Aufgabe 3.1):
 *
 *  a) Importiere auth aus '@/lib/auth' und redirect aus 'next/navigation'
 *  b) Hole die Session: const session = await auth()
 *  c) Keine Session? → redirect('/login')
 *  d) Übergib session.user an <Nav /> statt des Demo-Users
 */

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO a-c: Auth-Guard (erst an Tag 3!)
const session = await auth()

  if (!session) {
    redirect('/login')
  }
  
 //* TODO d: Demo-User durch session.user ersetzen
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav user={session.user} />
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

