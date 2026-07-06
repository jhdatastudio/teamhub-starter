import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 1.3c — Tasks-Tabelle
 * ═══════════════════════════════════════════════════════════
 *
 * 1) Definiere zuerst ein Status-Enum:
 *    statusEnum mit den Werten 'todo' | 'in_progress' | 'done'
 *
 * 2) Definiere die tasks-Tabelle:
 *
 * | Spalte      | Typ        | Constraints                     |
 * |-------------|------------|---------------------------------|
 * | id          | uuid       | Primary Key, DEFAULT random     |
 * | title       | text       | NOT NULL                        |
 * | description | text       | (optional)                      |
 * | status      | statusEnum | NOT NULL, DEFAULT 'todo'        |
 * | projectId   | uuid       | NOT NULL                        |
 * | assigneeId  | text       | (optional)                      |
 * | createdAt   | timestamp  | NOT NULL, DEFAULT now()         |
 */

// TODO 1) statusEnum definieren
export const statusEnum 

// TODO 2) tasks-Tabelle definieren
export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  // TODO: restliche Spalten
})

export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert
