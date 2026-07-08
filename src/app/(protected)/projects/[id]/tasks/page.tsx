import { db } from '@/db'
import { projects } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CreateTaskForm from './_components/create-task-form'
import TaskList from './_components/task-list'
import { unstable_cache } from 'next/cache'

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 2.7 — Dynamische Route + projekt-spezifischer Cache (ca. 25 Min)
 * ═══════════════════════════════════════════════════════════
 *
 * Diese Seite liegt unter /projects/[id]/tasks — [id] ist ein
 * dynamisches Routensegment.
 *
 * WICHTIG in Next.js 15: params ist ein Promise!
 *   const { id } = await params
 *
 *  a) Lade das Projekt (findFirst + where eq). Wenn es nicht
 *     existiert: notFound() aufrufen.
 *  b) Lade alle Tasks des Projekts, neueste zuerst.
 *  c) Wrappe die Task-Abfrage mit unstable_cache und dem
 *     projekt-spezifischen Tag `tasks-${id}` — derselbe Tag,
 *     den deine Server Actions invalidieren!
 */

//* TO DO B
async function getTasks(projectId: string) {
  return unstable_cache(
    async () => {
      return db.query.tasks.findMany({
        where: (t, { eq }) => eq(t.projectId, projectId),
        orderBy: (t, { desc }) => [desc(t.createdAt)],
      })
    },
    [`tasks-${projectId}`],
    { tags: [`tasks-${projectId}`] }
  )()
}

export default async function TasksPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // TODO a: Projekt laden, notFound() falls nicht vorhanden
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, id),
  })
  if (!project) notFound()

  // TODO b+c: Tasks laden (gecacht, Tag: `tasks-${id}`)
 
  const allTasks = await getTasks(id)

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/projects" className="hover:text-blue-600 transition-colors">
          Projekte
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{project.name}</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
        {project.description && (
          <p className="text-gray-500 mt-1">{project.description}</p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Neue Aufgabe
          </h2>
          <CreateTaskForm projectId={id} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Aufgaben ({allTasks.length})
          </h2>
          <TaskList tasks={allTasks} projectId={id} />
        </div>
      </div>
    </div>
  )
}
