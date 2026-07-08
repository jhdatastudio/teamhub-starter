import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 3.1 — Auth.js konfigurieren (ca. 45 Min)
 * ═══════════════════════════════════════════════════════════
 *
 * Auth.js v5 exportiert vier Dinge:
 *   handlers → Route Handler für /api/auth/[...nextauth]
 *   auth     → Session abrufen: const session = await auth()
 *   signIn   → Server Action zum Anmelden
 *   signOut  → Server Action zum Abmelden
 *
 * Deine Aufgaben:
 *
 *  a) authorize() implementieren:
 *     1. Prüfe, ob email + password vorhanden sind → sonst null
 *     2. Lade den Benutzer aus der DB:
 *        db.query.users.findFirst({ where: eq(users.email, ...) })
 *     3. Kein Benutzer gefunden → null
 *     4. Passwort vergleichen (⚠️ Seminar: Klartext.
 *        Produktion: bcrypt.compare!) → bei falsch null
 *     5. Objekt zurückgeben: { id, name, email, role }
 *
 *  b) jwt-Callback: Beim Login (user vorhanden) id und role
 *     in den Token übernehmen.
 *
 *  c) session-Callback: id und role aus dem Token in
 *     session.user übertragen.
 *
 * Diskussionsfrage: Warum speichert man die Rolle im JWT
 * statt sie bei jedem Request aus der DB zu laden?
 * Welchen Nachteil hat das? (Stichwort: Rollenwechsel)
 */

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'E-Mail', type: 'email' },
        password: { label: 'Passwort', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
    return null
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, credentials.email as string),
  })

  if (!user) {
    return null
  }

  if (user.password !== credentials.password) {
    return null
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // TODO b
       if (user) {
    token.id = user.id
    token.role = user.role
  }
      return token
    },
    session({ session, token }) {
      // TODO c
       if (session.user) {
    session.user.id = token.id as string
    session.user.role = token.role as 'admin' | 'member'
  }
      return session
    },
  },
  pages: { signIn: '/login' },
})
