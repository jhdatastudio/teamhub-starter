import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from './users'

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 1.3b — Projects-Tabelle
 * ═══════════════════════════════════════════════════════════
 *
 * | Spalte      | Typ       | Constraints                              |
 * |-------------|-----------|-------------------------------------------|
 * | id          | uuid      | Primary Key, DEFAULT random               |
 * | name        | text      | NOT NULL                                  |
 * | description | text      | (optional)                                |
 * | ownerId     | text      | FK → users.id, ON DELETE CASCADE          |
 * | createdAt   | timestamp | NOT NULL, DEFAULT now()                   |
 * | updatedAt   | timestamp | NOT NULL, DEFAULT now()                   |
 *
 * Denkaufgabe (im Plenum besprechen):
 *  - Warum uuid statt fortlaufender Integer?
 *  - Was bewirkt onDelete: 'cascade' genau — und wann wäre
 *    'set null' die bessere Wahl?
 *
 * Foreign-Key-Syntax:
 *   spalte: text('spalte').references(() => andereTabelle.id, { onDelete: '...' })
 */

export const projects = pgTable('projects', {
  // TODO: alle Spalten laut Tabelle definieren
  id: uuid('id').primaryKey().defaultRandom(),
})

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
