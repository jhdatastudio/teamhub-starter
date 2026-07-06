import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

/**
 * ═══════════════════════════════════════════════════════════
 * AUFGABE 1.2 — Singleton-Pattern (ca. 30 Min)
 * ═══════════════════════════════════════════════════════════
 *
 * Problem: Bei jedem Hot Reload in der Entwicklung lädt Next.js
 * dieses Modul neu → jedes Mal eine neue DB-Verbindung.
 * Neon (Free Tier) erlaubt nur begrenzt viele Verbindungen.
 *
 * Deine Aufgabe:
 *  a) Definiere ein Objekt `globalForDb`, das globalThis nutzt,
 *     um eine db-Instanz über Hot Reloads hinweg zu speichern.
 *  b) Erstelle die db-Instanz nur, wenn noch keine existiert.
 *     Tipp: Nullish Coalescing Operator ??
 *  c) Speichere die Instanz in globalForDb — aber nur wenn
 *     NODE_ENV nicht 'production' ist.
 *
 */

const sql = neon(process.env.DATABASE_URL!)

// TODO a) globalForDb definieren

// TODO b) db erstellen (Singleton) — ersetze die folgende Zeile:
export const db = drizzle(sql, { schema })

// TODO c) Instanz in Entwicklung global speichern
