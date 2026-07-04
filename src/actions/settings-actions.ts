'use server'

import { revalidateTag } from 'next/cache'
import { db } from '@/db'
import { settings } from '@/db/schema'
import { updateSettingSchema } from '@/lib/validations'

type SettingFormState = {
  error?: Record<string, string[]>
  success?: boolean
} | null

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 3.3 — Upsert für Einstellungen (ca. 45 Min)
 * ═══════════════════════════════════════════════════════════
 *
 * DAS ist Sebastians Use Case: Konfigurationsdaten direkt
 * in Next.js verwalten, ohne C#-BFF.
 *
 * Neu hier: UPSERT — einfügen ODER aktualisieren, atomar.
 * SQL: INSERT ... ON CONFLICT (key) DO UPDATE SET ...
 *
 * Drizzle-Syntax:
 *   await db.insert(settings)
 *     .values({ ... })
 *     .onConflictDoUpdate({
 *       target: settings.key,       // welche Spalte kollidiert
 *       set: { value: ..., updatedAt: new Date() },
 *     })
 *
 * Deine Aufgaben:
 *  a) Berechtigungsprüfung: nur Admins!
 *     const session = await auth()
 *     if (session?.user?.role !== 'admin') redirect('/dashboard')
 *  b) key + value aus formData → mit updateSettingSchema validieren
 *  c) Upsert ausführen (siehe Syntax oben)
 *  d) revalidateTag('settings') + { success: true } zurückgeben
 *
 * Diskussionsfrage: Warum Upsert statt "erst SELECT, dann
 * INSERT oder UPDATE"? (Stichwort: Race Condition, Atomarität)
 */
export async function upsertSetting(
  _prevState: SettingFormState,
  formData: FormData
): Promise<SettingFormState> {
  // TODO a-d implementieren
  return null // TODO: ersetzen
}
