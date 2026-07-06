import { db } from './index'
import { users, projects, tasks, settings } from './schema'

async function seed() {
  console.log('🌱 Starte Seed...')

  // Benutzer anlegen
  await db
    .insert(users)
    .values([
      {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@teamhub.dev',
        password: 'admin123', // ⚠️ NUR FÜR DAS SEMINAR!
        role: 'admin',
      },
      {
        id: 'user-1',
        name: 'Sebastian',
        email: 'sebastian@teamhub.dev',
        password: 'user123',
        role: 'member',
      },
    ])
    .onConflictDoNothing()

  console.log('✓ Benutzer angelegt')

  // Projekte anlegen
  const [project] = await db
    .insert(projects)
    .values([
      {
        name: 'Website Redesign',
        description: 'Komplette Überarbeitung der Unternehmenswebsite',
        ownerId: 'admin-1',
      },
      {
        name: 'API Migration',
        description: 'Migration vom C#-BFF auf direkte Next.js DB-Zugriffe',
        ownerId: 'user-1',
      },
    ])
    .returning()
    .onConflictDoNothing()

  console.log('✓ Projekte angelegt')

  // Aufgaben anlegen
  if (project?.id) {
    await db
      .insert(tasks)
      .values([
        { title: 'Design-Konzept erstellen', projectId: project.id, status: 'done' },
        { title: 'Komponenten bauen', projectId: project.id, status: 'in_progress' },
        { title: 'Testing durchführen', projectId: project.id, status: 'todo' },
      ])
      .onConflictDoNothing()
    console.log('✓ Aufgaben angelegt')
  }

  // Einstellungen anlegen (Sebastian's Use Case)
  await db
    .insert(settings)
    .values([
      {
        key: 'app_name',
        value: 'TeamHub',
        description: 'Name der Anwendung',
      },
      {
        key: 'max_projects',
        value: '50',
        description: 'Maximale Anzahl Projekte pro Nutzer',
      },
      {
        key: 'maintenance_mode',
        value: 'false',
        description: 'Wartungsmodus aktivieren',
      },
      {
        key: 'support_email',
        value: 'support@teamhub.dev',
        description: 'Support-E-Mail-Adresse',
      },
    ])
    .onConflictDoNothing()

  console.log('✓ Einstellungen angelegt')
  console.log('')
  console.log('🎉 Seed abgeschlossen!')
  console.log('   Anmelden mit: admin@teamhub.dev / admin123')
}

seed()
  .catch(console.error)
  .finally(() => process.exit())
