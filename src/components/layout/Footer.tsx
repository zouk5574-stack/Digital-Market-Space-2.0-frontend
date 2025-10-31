// src/components/layout/Footer.tsx
import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between text-sm text-slate-600">
        <div>
          © 2025 Digital Market Space — Tous droits réservés.
        </div>
        <div className="flex gap-4">
          <Link href="/terms"><a>CGU</a></Link>
          <Link href="/privacy"><a>Politique de confidentialité</a></Link>
        </div>
      </div>
    </footer>
  )
}
