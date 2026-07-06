import { relations } from 'drizzle-orm'
import { users } from './users'
import { projects } from './projects'
import { tasks } from './tasks'

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 1.4 — Relations definieren (ca. 15 Min)
 * ═══════════════════════════════════════════════════════════
 *
 * Drizzle braucht explizite relations()-Definitionen, damit
 * db.query.projects.findMany({ with: { tasks: true } })
 * funktioniert (JOIN-Abfragen).
 *
 * Beziehungen in TeamHub:
 *   users    1 ──── n  projects   (ein User besitzt viele Projekte)
 *   projects 1 ──── n  tasks      (ein Projekt hat viele Tasks)
 *
 * Syntax-Beispiel für eine 1:n-Beziehung:
 *
 *   export const xRelations = relations(x, ({ many }) => ({
 *     ys: many(y),
 *   }))
 *   export const yRelations = relations(y, ({ one }) => ({
 *     x: one(x, { fields: [y.xId], references: [x.id] }),
 *   }))
 */

// TODO: usersRelations (many: projects)
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}))

// TODO: projectsRelations (one: owner/users, many: tasks)

// TODO: tasksRelations (one: project)
