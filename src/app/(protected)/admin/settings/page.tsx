import SettingForm from './_components/setting-form'

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 3.3b — Einstellungen laden (ca. 15 Min)
 * ═══════════════════════════════════════════════════════════
 *
 *  a) Lade alle Settings (alphabetisch nach key sortiert)
 *  b) Wrappe mit unstable_cache, Tag: 'settings'
 *  c) Rendere pro Setting ein <SettingForm setting={...} />
 */

export default async function AdminSettingsPage() {
  // TODO a+b: Settings gecacht laden
  const allSettings: never[] = []

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Einstellungen</h1>
        <p className="text-gray-500 text-sm mt-1">
          Konfigurationswerte direkt aus der Datenbank — kein BFF nötig.
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {/* TODO c: Settings-Liste rendern */}
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-semibold mb-4">Neue Einstellung</h2>
        <SettingForm setting={null} />
      </div>
    </div>
  )
}
