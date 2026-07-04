import Link from 'next/link'
import { deleteProject } from '@/actions/project-actions'
import type { Project } from '@/db/schema'

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-gray-500 text-sm">
        Noch keine Projekte vorhanden.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-xl border p-4 flex justify-between items-start hover:border-blue-200 transition-colors"
        >
          <div className="min-w-0">
            <Link
              href={`/projects/${project.id}/tasks`}
              className="font-medium text-gray-900 hover:text-blue-600 transition-colors truncate block"
            >
              {project.name}
            </Link>
            {project.description && (
              <p className="text-sm text-gray-500 mt-0.5 truncate">{project.description}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              {new Date(project.createdAt).toLocaleDateString('de-DE')}
            </p>
          </div>
          <form action={deleteProject.bind(null, project.id)} className="ml-3 flex-shrink-0">
            <button
              type="submit"
              className="text-sm text-red-400 hover:text-red-600 transition-colors"
            >
              Löschen
            </button>
          </form>
        </div>
      ))}
    </div>
  )
}
