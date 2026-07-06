'use client'

import { deleteTask, updateTaskStatus } from '@/actions/task-actions'
import type { Task } from '@/db/schema'

const STATUS_LABELS = {
  todo: 'Offen',
  in_progress: 'In Bearbeitung',
  done: 'Erledigt',
}

const STATUS_COLORS = {
  todo: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-yellow-100 text-yellow-800',
  done: 'bg-green-100 text-green-800',
}

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 2.4 — useOptimistic einbauen (ca. 35 Min)
 * ═══════════════════════════════════════════════════════════
 *
 * Aktueller Zustand: Klick auf Status-Button → Server Action →
 * Cache invalidiert → Seite lädt neu → Status ändert sich.
 * Das dauert spürbar (500ms+).
 *
 * Ziel: Der Status soll SOFORT umschalten (optimistic update),
 * während der Server im Hintergrund aktualisiert.
 *
 * Schritte:
 *  a) Importiere useOptimistic und useTransition aus 'react'
 *  b) const [optimisticTasks, setOptimisticStatus] = useOptimistic(
 *       tasks,
 *       (state, { id, status }) => state.map(...)  // Reducer
 *     )
 *  c) Rendere optimisticTasks statt tasks
 *  d) Im onClick: startTransition(async () => {
 *       setOptimisticStatus({ id, status })
 *       await updateTaskStatus(...)
 *     })
 *
 * Testfrage: Was passiert, wenn die Server Action fehlschlägt?
 * (Ausprobieren: Netzwerk in DevTools auf offline stellen)
 */

export default function TaskList({
  tasks,
  projectId,
}: {
  tasks: Task[]
  projectId: string
}) {
  // TODO a+b: useOptimistic + useTransition einrichten

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-gray-500 text-sm">
        Noch keine Aufgaben vorhanden.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {/* TODO c: optimisticTasks statt tasks rendern */}
      {tasks.map((task) => (
        <div key={task.id} className="bg-white rounded-xl border p-4">
          <div className="flex justify-between items-start gap-2">
            <p className="font-medium text-gray-900 text-sm">{task.title}</p>
            <form action={deleteTask.bind(null, task.id, projectId)} className="flex-shrink-0">
              <button type="submit" className="text-xs text-red-400 hover:text-red-600">
                ×
              </button>
            </form>
          </div>
          {task.description && (
            <p className="text-xs text-gray-500 mt-1">{task.description}</p>
          )}
          <div className="mt-2 flex gap-1 flex-wrap">
            {(['todo', 'in_progress', 'done'] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  // TODO d: startTransition + setOptimisticStatus + Server Action
                  updateTaskStatus(task.id, s, projectId)
                }}
                className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                  task.status === s
                    ? STATUS_COLORS[s] + ' font-semibold ring-1 ring-current'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
