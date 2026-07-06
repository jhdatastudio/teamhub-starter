'use client'

import { useActionState } from 'react'
import { createTask } from '@/actions/task-actions'

export default function CreateTaskForm({ projectId }: { projectId: string }) {
  const [state, formAction, isPending] = useActionState(createTask, null)

  return (
    <div className="bg-white rounded-xl border p-6">
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="projectId" value={projectId} />
        <div>
          <input
            name="title"
            placeholder="Aufgabentitel *"
            required
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.error?.title && (
            <p className="text-red-500 text-xs mt-1">{state.error.title[0]}</p>
          )}
        </div>
        <textarea
          name="description"
          placeholder="Beschreibung (optional)"
          rows={2}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isPending ? 'Wird erstellt...' : 'Aufgabe erstellen'}
        </button>
      </form>
    </div>
  )
}
