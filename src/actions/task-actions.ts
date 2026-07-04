'use server'

import { revalidateTag } from 'next/cache'
import { db } from '@/db'
import { tasks } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { createTaskSchema } from '@/lib/validations'

type TaskFormState = {
  error?: Record<string, string[]>
} | null

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 2.3 — Server Actions: Tasks (ca. 45 Min)
 * ═══════════════════════════════════════════════════════════
 *
 * Gleicher Ablauf wie bei createProject, ABER:
 * Der Cache-Tag ist projekt-spezifisch!
 *
 *   revalidateTag(`tasks-${projectId}`)
 *
 * Warum? Wenn Task in Projekt A erstellt wird, soll nur die
 * Task-Liste von Projekt A neu laden — nicht die von Projekt B.
 * Das nennt man granulare Cache-Invalidierung.
 */
export async function createTask(
  _prevState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  // TODO: extrahieren (title, description, projectId) → validieren
  //       → einfügen → revalidateTag(`tasks-${projectId}`)
  return null // TODO: entfernen
}

export async function deleteTask(id: string, projectId: string) {
  // TODO: löschen + projekt-spezifischen Tag invalidieren
}

/**
 * AUFGABE 2.4-Vorbereitung — Status ändern
 * Diese Action wird an Tag 2 Nachmittag von useOptimistic aufgerufen.
 *   Tipp: db.update(tasks).set({ status }).where(eq(tasks.id, id))
 */
export async function updateTaskStatus(
  id: string,
  status: 'todo' | 'in_progress' | 'done',
  projectId: string
) {
  // TODO
}
