# TeamHub — Starter-Repo

> Starterpunkt für das Fullstack Next.js Seminar

## Repo auf GitHub veröffentlichen (für Jacqueline)

```bash
# 1. Im Projektordner: Git initialisieren
git init
git add .
git commit -m "Initial commit: TeamHub starter"

# 2. Neues Repository auf github.com anlegen
#    → Repo-Name empfohlen: teamhub-starter
#    → Sichtbarkeit: Public (Teilnehmer können es klonen ohne Login)

# 3. Remote verbinden und pushen
git remote add origin https://github.com/DEIN-USERNAME/teamhub-starter.git
git branch -M main
git push -u origin main
```

---

## Teilnehmer klonen das Repo so (Tag 1, Setup-Block)

```bash
# Starter-Repo klonen
git clone https://github.com/DEIN-USERNAME/teamhub-starter.git teamhub
cd teamhub

# Abhängigkeiten installieren
npm install

# Umgebungsvariablen anlegen
cp .env.example .env
# .env öffnen → DATABASE_URL von Neon.tech eintragen
# AUTH_SECRET beliebigen langen String eintragen (z.B. "seminar-secret-2025")
```

---

## Setup (nach dem Klonen — gemeinsam im Seminar)

```bash
# Datenbank-Schema erstellen (nach Neon-Account und .env Setup)
npm run db:generate
npm run db:migrate

# Testdaten einfügen
npm run db:seed

# Entwicklungsserver starten
npm run dev
```

Anmelden unter `http://localhost:3000` mit:
- Admin: `admin@teamhub.dev` / `admin123`
- Member: `sebastian@teamhub.dev` / `user123`

## Was ist bereits vorbereitet?

- ✅ Next.js 15 Projektstruktur
- ✅ Tailwind CSS konfiguriert
- ✅ Drizzle ORM + Neon Setup
- ✅ Auth.js (NextAuth v5) Grundstruktur
- ✅ Navigation & Layout-Komponenten
- ✅ Alle Seiten als Platzhalter

## Was werden wir gemeinsam bauen?

### Tag 1 — Datenbankfundament
- `src/db/index.ts` → Singleton-Pattern
- `src/db/schema/*.ts` → Tabellendefinitionen
- `src/app/(protected)/dashboard/page.tsx` → Erste Datenbankabfrage

### Tag 2 — Interaktion
- `src/lib/validations.ts` → Zod-Schemas
- `src/actions/project-actions.ts` → Server Actions
- `src/actions/task-actions.ts` → Tasks + useOptimistic

### Tag 3 — Auth & Konfiguration
- `src/lib/auth.ts` → Authentifizierung
- `src/actions/settings-actions.ts` → Admin-Einstellungen
- `src/app/api/export/route.ts` → Route Handler

## TODO-Kommentare

Dateien mit `// TODO:` markieren die Aufgaben für das Seminar.
Die vollständige Lösung ist im separaten `teamhub-solution` Repo.
