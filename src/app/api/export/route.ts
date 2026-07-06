import { NextResponse } from 'next/server'
import { db } from '@/db'

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 3.4 — Route Handler: JSON-Export (ca. 30 Min)
 * ═══════════════════════════════════════════════════════════
 *
 * Route Handler = klassische API-Endpunkte im App Router.
 * Der Dateiname route.ts + exportierte Funktion GET/POST/...
 * bestimmen Pfad und Methode: GET /api/export
 *
 * Wann Route Handler statt Server Action?
 *  → Externe Systeme, Webhooks, Downloads, alles was eine
 *    "richtige" HTTP-Antwort braucht.
 *
 * Deine Aufgaben:
 *  a) Session prüfen — ohne Login: Status 401 mit
 *     NextResponse.json({ error: '...' }, { status: 401 })
 *  b) Alle Projekte MIT ihren Tasks laden:
 *     (Das funktioniert nur, wenn Aufgabe 1.4 — relations —
 *     korrekt gelöst wurde!)
 *  c) JSON zurückgeben mit: exportedAt (ISO-String),
 *     count, projects
 *
 * BONUS 3.B — CSV-Export (fortgeschritten, ca. 30 Min):
 *  d) Lies das Query-Param ?format=csv aus
 *     (new URL(request.url).searchParams)
 *  e) Bei csv: baue einen CSV-String (Kopfzeile + Zeilen)
 *     und gib ihn zurück mit
 *     Content-Type: text/csv und
 *     Content-Disposition: attachment; filename="projekte.csv"
 */

export async function GET(request: Request) {
  // TODO a-c implementieren
  return NextResponse.json({ todo: 'Aufgabe 3.4' })
}
