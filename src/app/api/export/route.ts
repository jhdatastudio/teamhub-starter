import { NextResponse } from 'next/server'
import { db } from '@/db'
import { auth } from '@/lib/auth'

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
 *     db.query.projects.findMany({ with: { tasks: true } })
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

 //export async function GET(request: Request) {
  // TODO a-c implementieren
 
  

  // export async function GET(request: Request) {
  // const session = await auth()
   // if (!session) {
   //   return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
   // }

   // const allProjects = await db.query.projects.findMany({
    //  with: { tasks: true },
   // })

   // return NextResponse.json({
    //  exportedAt: new Date().toISOString(),
    //  count: allProjects.length,
    //  projects: allProjects,
   // })
 // }



 export async function GET(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }

  const allProjects = await db.query.projects.findMany({
    with: { tasks: true },
  })

  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format')

  if (format === 'csv') {
    const header = 'name,description,taskCount,createdAt'
    const rows = allProjects.map((p) =>
      [p.name, p.description ?? '', p.tasks.length, p.createdAt.toISOString()].join(',')
    )
    const csv = [header, ...rows].join('\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="projekte.csv"',
      },
    })
  }

  return NextResponse.json({
    exportedAt: new Date().toISOString(),
    count: allProjects.length,
    projects: allProjects,
  })
}