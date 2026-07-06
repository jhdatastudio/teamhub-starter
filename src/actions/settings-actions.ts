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
 *  b) key + value aus formData → mit updateSettingSchema validieren
 *  c) Upsert ausführen
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
