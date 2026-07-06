'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { projects } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { createProjectSchema } from '@/lib/validations'

type ProjectFormState = {
  error?: Record<string, string[]>
} | null

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 2.2 — Server Action: Projekt erstellen (ca. 45 Min)
 * ═══════════════════════════════════════════════════════════
 *
 * Ablauf einer Server Action mit Validierung:
 *
 *   1. Rohdaten aus formData extrahieren
 *   2. Mit Zod validieren
 *   3. Bei Fehler: fieldErrors zurückgeben
 *   4. In DB einfügen
 *   5. Cache invalidieren
 *   6. Weiterleiten
 *
 * Fragen zum Diskutieren:
 *  - Warum safeParse statt parse?
 *  - Warum steht redirect NACH revalidateTag?
 *  - Was passiert, wenn man revalidateTag vergisst?
 *
 * (Der auth()-Check kommt an Tag 3 dazu — heute noch ohne.)
 */
export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  // TODO Schritt 1: Rohdaten extrahieren
  //   description: formData.get('description') || undefined
  //   (leerer String soll als "nicht angegeben" gelten)

  // TODO Schritt 2+3: validieren, bei Fehler fieldErrors zurückgeben

  // TODO Schritt 4: einfügen

  // TODO Schritt 5+6: Cache invalidieren + weiterleiten

  return null // TODO: entfernen sobald implementiert
}

/**
 * AUFGABE 2.2b — Projekt löschen
 *  - Lösche das Projekt mit der übergebenen id
 *    Tipp: db.delete(projects).where(eq(projects.id, id))
 *  - Cache invalidieren nicht vergessen!
 */
export async function deleteProject(id: string) {
  // TODO
}
