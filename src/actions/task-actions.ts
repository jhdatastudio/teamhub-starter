'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
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
  const raw = {
    title: formData.get('title'),
    description: formData.get('description') || undefined,
    projectId: formData.get('projectId'),
  }

  const result = createTaskSchema.safeParse(raw)

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }

  await db.insert(tasks).values({
    title: result.data.title,
    description: result.data.description,
    projectId: result.data.projectId,
  })

  revalidateTag(`tasks-${result.data.projectId}`)
  redirect(`/projects/${result.data.projectId}`)
}



export async function deleteTask(id: string, projectId: string) {
  // TODO: löschen + projekt-spezifischen Tag invalidieren
  await db.delete(tasks).where(eq(tasks.id, id))
  revalidateTag(`tasks-${projectId}`)
  redirect(`/projects/${projectId}`)
}


/**
 * -Vorbereitung — Status ändern
 * Diese Action wird an Tag 2 Nachmittag von useOptimistic aufgerufen.
 *   Tipp: db.update(tasks).set({ status }).where(eq(tasks.id, id))
 */
export async function updateTaskStatus(
  id: string,
  status: 'todo' | 'in_progress' | 'done',
  projectId: string
) {
  // TODO
  await db.update(tasks).set({ status }).where(eq(tasks.id, id))
  revalidateTag(`tasks-${projectId}`)
}
