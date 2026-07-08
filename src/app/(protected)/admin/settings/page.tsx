import { unstable_cache } from 'next/cache'
import { db } from '@/db'
import SettingForm from './_components/setting-form'

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 3.3b — Einstellungen laden (ca. 15 Min)
 * ═══════════════════════════════════════════════════════════
 *
 *  a) Lade alle Settings (db.query.settings.findMany,
 *     alphabetisch nach key sortiert)
 *  b) Wrappe mit unstable_cache, Tag: 'settings'
 *  c) Rendere pro Setting ein <SettingForm setting={...} />
 */

const getSettings = unstable_cache(
  async () => {
    return db.query.settings.findMany({
      orderBy: (s, { asc }) => [asc(s.key)],
    })
  },
  ['all-settings'],
  { tags: ['settings'] }
)


export default async function AdminSettingsPage() {
  // TODO a+b: Settings gecacht laden
  const allSettings = await getSettings()

    return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Einstellungen</h1>
        <p className="text-gray-500 text-sm mt-1">
          Konfigurationswerte direkt aus der Datenbank — kein BFF nötig.
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {allSettings.map((setting) => (
          <SettingForm key={setting.key} setting={setting} />
        ))}
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-semibold mb-4">Neue Einstellung</h2>
        <SettingForm setting={null} />
      </div>
    </div>
  )
}