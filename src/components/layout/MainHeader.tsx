// src/components/layout/MainHeader.tsx
'use client'
import Link from 'next/link'
import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useThemeContext } from '@/components/theme/theme-provider'

export default function MainHeader() {
  const { theme, setTheme } = useThemeContext()

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link href="/">
            <a className="font-bold text-lg tracking-tight">Digital Market Space</a>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex gap-4">
              <Link href="/products"><a className="text-sm">Produits</a></Link>
              <Link href="/dashboard"><a className="text-sm">Dashboard</a></Link>
              <Link href="/profile"><a className="text-sm">Profil</a></Link>
            </nav>

            <button
              aria-label="toggle-theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-slate-100"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
