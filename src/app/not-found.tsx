// app/not-found.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Illustration */}
        <div className="text-8xl mb-6">🔍</div>
        
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Page non trouvée
        </h2>
        
        <p className="text-slate-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton asChild>
            <Link href="/">
              <Home size={16} />
              Accueil
            </Link>
          </MagneticButton>
          
          <MagneticButton variant="outline" asChild>
            <Link href="/missions">
              <Search size={16} />
              Explorer les missions
            </Link>
          </MagneticButton>
        </div>

        {/* Search suggestion */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600 mb-2">
            Vous cherchez quelque chose de spécifique ?
          </p>
          <Link 
            href="/search"
            className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center justify-center gap-2"
          >
            <Search size={16} />
            Utiliser la recherche avancée
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
