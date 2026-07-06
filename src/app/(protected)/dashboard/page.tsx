import Link from 'next/link'

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 1.6 — Erste Datenbankabfrage (ca. 30 Min)
 * ═══════════════════════════════════════════════════════════
 *
 * Diese Server Component zeigt aktuell hartkodierte Nullen.
 * Deine Aufgabe:
 *
 *  a) Importiere db, projects, tasks und count aus drizzle-orm
 *  b) Schreibe eine async-Funktion getStats(), die die Anzahl
 *     der Projekte und Tasks aus der DB liest.
 *  c) Rufe getStats() in der Komponente auf (await!) und
 *     ersetze die Nullen.
 *
 * AUFGABE 2.5 (Tag 2) — Caching nachrüsten (ca. 20 Min):
 *  d) Wrappe getStats mit unstable_cache aus 'next/cache'
 *     – Cache-Key: ['dashboard-stats']
 *     – tags: ['projects', 'tasks']
 *     – revalidate: 60
 *  e) Wichtig: unstable_cache auf MODULEBENE definieren,
 *     nicht innerhalb der Komponente. Warum?
 *
 * BONUS 1.B — Letzte Projekte anzeigen:
 *  f) Lade zusätzlich die 3 neuesten Projekte
 *     und zeige sie unter den Statistik-Karten als Liste an.
 */

export default async function DashboardPage() {
  // TODO b+c: echte Zahlen aus der Datenbank laden
  const stats = { projects: 0, tasks: 0 }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Übersicht über alle Projekte und Aufgaben</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Projekte gesamt</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{stats.projects}</p>
        </div>
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Aufgaben gesamt</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{stats.tasks}</p>
        </div>
      </div>

      {/* BONUS 1.B: Hier die 3 neuesten Projekte anzeigen */}

      <div className="flex gap-3">
        <Link
          href="/projects"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Alle Projekte anzeigen
        </Link>
        <Link
          href="/api/export"
          target="_blank"
          className="bg-white text-gray-700 rounded-lg px-4 py-2 text-sm font-medium border hover:bg-gray-50 transition-colors"
        >
          JSON Export
        </Link>
      </div>
    </div>
  )
}
