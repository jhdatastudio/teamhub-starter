'use client'

import { useActionState } from 'react'
import { upsertSetting } from '@/actions/settings-actions'
import type { Setting } from '@/db/schema'

export default function SettingForm({ setting }: { setting: Setting | null }) {
  const [state, formAction, isPending] = useActionState(upsertSetting, null)

  return (
    <div className="bg-white rounded-xl border p-4">
      {setting && (
        <div className="mb-2">
          <code className="text-sm font-mono font-semibold">{setting.key}</code>
          {setting.description && (
            <p className="text-xs text-gray-500 mt-0.5">{setting.description}</p>
          )}
        </div>
      )}
      <form action={formAction} className="flex gap-2">
        {setting ? (
          <input type="hidden" name="key" value={setting.key} />
        ) : (
          <input
            name="key"
            placeholder="schluessel"
            required
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <input
          name="value"
          defaultValue={setting?.value}
          placeholder="Wert"
          required
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isPending}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
            setting
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isPending ? '...' : setting ? 'Speichern' : 'Hinzufügen'}
        </button>
      </form>
      {state?.success && (
        <p className="text-green-600 text-xs mt-1">✓ Gespeichert</p>
      )}
    </div>
  )
}
