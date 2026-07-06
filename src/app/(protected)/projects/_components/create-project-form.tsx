'use client'

import { useActionState } from 'react'
import { createProject } from '@/actions/project-actions'

const initialState = null

export default function CreateProjectForm() {
  const [state, formAction, isPending] = useActionState(createProject, initialState)

  return (
    <div className="bg-white rounded-xl border p-6">
      <form action={formAction} className="space-y-4">
        <div>
          <input
            name="name"
            placeholder="Projektname *"
            required
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.error?.name && (
            <p className="text-red-500 text-xs mt-1">{state.error.name[0]}</p>
          )}
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Beschreibung (optional)"
            rows={3}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isPending ? 'Wird erstellt...' : 'Projekt erstellen'}
        </button>
      </form>
    </div>
  )
}
