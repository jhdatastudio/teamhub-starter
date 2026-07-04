'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

interface NavProps {
  user: {
    name?: string | null
    email?: string | null
    role?: string
  }
}

export default function Nav({ user }: NavProps) {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/projects', label: 'Projekte' },
    ...(user.role === 'admin'
      ? [
          { href: '/admin/settings', label: 'Einstellungen' },
          { href: '/admin/users', label: 'Benutzer' },
        ]
      : []),
  ]

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <span className="font-bold text-blue-600 text-lg">TeamHub</span>
          <div className="flex gap-4">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  pathname.startsWith(href)
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{user.name || user.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Abmelden
          </button>
        </div>
      </div>
    </nav>
  )
}
