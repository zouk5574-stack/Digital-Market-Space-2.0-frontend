// components/admin/backup/backup-actions.tsx
'use client'

import { useState } from 'react'
import { MagneticButton } from '@/components/atomic/magnetic-button'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Download, Settings, ChevronDown } from 'lucide-react'

interface BackupActionsProps {
  onCreateBackup: (type: 'full' | 'partial') => void
  onRestoreBackup: (backupId: string) => void
  isLoading?: boolean
}

export function BackupActions({ 
  onCreateBackup, 
  onRestoreBackup, 
  isLoading = false 
}: BackupActionsProps) {
  const [showCreateMenu, setShowCreateMenu] = useState(false)

  const handleCreateBackup = (type: 'full' | 'partial') => {
    onCreateBackup(type)
    setShowCreateMenu(false)
  }

  return (
    <div className="flex items-center gap-3">
      {/* Menu déroulant Créer une sauvegarde */}
      <div className="relative">
        <MagneticButton
          variant="primary"
          onClick={() => setShowCreateMenu(!showCreateMenu)}
          disabled={isLoading}
        >
          <Plus size={16} />
          Créer une sauvegarde
          <ChevronDown size={16} className={`transition-transform ${showCreateMenu ? 'rotate-180' : ''}`} />
        </MagneticButton>

        <AnimatePresence>
          {showCreateMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-lg z-10"
            >
              <div className="p-2">
                <button
                  onClick={() => handleCreateBackup('full')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
                >
                  <div className="font-medium">Sauvegarde complète</div>
                  <div className="text-xs text-slate-500">Toutes les données</div>
                </button>
                
                <button
                  onClick={() => handleCreateBackup('partial')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
                >
                  <div className="font-medium">Sauvegarde partielle</div>
                  <div className="text-xs text-slate-500">Données essentielles seulement</div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bouton Restaurer */}
      <MagneticButton variant="outline" size="sm">
        <Download size={16} />
        Restaurer
      </MagneticButton>

      {/* Bouton Paramètres */}
      <MagneticButton variant="outline" size="sm">
        <Settings size={16} />
        Paramètres
      </MagneticButton>
    </div>
  )
}
