import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 3.2b — Rollenbasierter Zugriff / RBAC (ca. 10 Min)
 * ═══════════════════════════════════════════════════════════
 *
 * Alles unter /admin darf nur von Admins gesehen werden.
 *
 *  a) Session holen (auth())
 *  b) Rolle prüfen: session.user.role
 *  c) Kein Admin? → redirect('/dashboard')
 *
 * Diskussionsfrage: Reicht dieser Layout-Guard als Schutz?
 * Was ist mit den Server Actions selbst — kann ein Member
 * upsertSetting direkt aufrufen? (Antwort: ja! Deshalb muss
 * JEDE Action ihre eigene Berechtigung prüfen. Layouts sind
 * UI-Schutz, keine Sicherheitsgrenze.)
 */

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO a-c: Admin-Guard
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div>
      <div className="mb-6 flex gap-1 text-xs text-gray-400">
        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium">
          Admin-Bereich
        </span>
      </div>
      {children}
    </div>
  )
}
