import CreateProjectForm from './_components/create-project-form'
import ProjectList from './_components/project-list'
import { db } from '@/db'
import { unstable_cache } from 'next/cache'

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 1.7 — Projektliste aus der DB laden (ca. 20 Min)
 * ═══════════════════════════════════════════════════════════
 *
 *  a) Lade alle Projekte mit db.query.projects.findMany()
 *     sortiert nach createdAt absteigend.
 *     Tipp: orderBy: (p, { desc }) => [desc(p.createdAt)]
 *  b) Übergib sie an <ProjectList projects={...} />
 *
 * AUFGABE 2.6 (Tag 2) — Caching (ca. 10 Min):
 *  c) Wrappe die Abfrage mit unstable_cache, Tag: 'projects'
 *
 * BONUS 2.B — Suche (fortgeschritten):
 *  d) Lies searchParams (?q=...) aus und filtere mit
 *     where: ilike(projects.name, `%${q}%`)
 */

/* 1.7*/ 
// async function getAllProjects() {
//  return db.query.projects.findMany({
//    orderBy: (p, { desc }) => [desc(p.createdAt)],
//  })
//}

// 2.6
// const getAllProjects = unstable_cache(
//  async () => {
//    return db.query.projects.findMany({
//      orderBy: (p, { desc }) => [desc(p.createdAt)],
//    })
//  },
//  ['all-projects'],
//  { tags: ['projects'] }
//)

async function getAllProjects(q?: string) {
  return unstable_cache(
    async () => {
      return db.query.projects.findMany({
        where: q ? (p, { ilike }) => ilike(p.name, `%${q}%`) : undefined,
        orderBy: (p, { desc }) => [desc(p.createdAt)],
      })
    },
    ['all-projects', q ?? ''],
    { tags: ['projects'] }
  )()
}

export default async function ProjectsPage( {

  //*2.B
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  /* 1.7*/ 
  // TODO a: Projekte aus der Datenbank laden
  const allProjects = await getAllProjects(q)



  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Projekte</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Neues Projekt
          </h2>
          <CreateProjectForm />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Alle Projekte ({allProjects.length})
          </h2>
          <ProjectList projects={allProjects} />
        </div>
      </div>
    </div>
  )
}
