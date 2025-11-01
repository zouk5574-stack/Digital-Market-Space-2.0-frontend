// components/admin/mission-actions.tsx
'use client'

import { useState } from 'react'
import { useUpdateMissionStatus } from '@/hooks/admin/use-admin-missions'
import { MagneticButton } from '@/components/atomic/magnetic-button'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreVertical, Eye, Edit, Archive, Trash2 } from 'lucide-react'

interface MissionActionsProps {
  mission: any
  onUpdate: () => void
}

export function MissionActions({ mission, onUpdate }: MissionActionsProps) {
  const [showMenu, setShowMenu] = useState(false)
  const updateStatus = useUpdateMissionStatus()

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateStatus.mutateAsync({
        missionId: mission._id,
        status: newStatus
      })
      onUpdate()
    } catch (error) {
      console.error('Erreur mise à jour statut:', error)
    }
    setShowMenu(false)
  }

  const getAvailableActions = () => {
    const baseActions = [
      { label: 'Voir détails', icon: Eye, onClick: () => {} },
      { label: 'Modifier', icon: Edit, onClick: () => {} }
    ]

    const statusActions = {
      draft: [
        { label: 'Publier', icon: Eye, onClick: () => handleStatusUpdate('published') }
      ],
      published: [
        { label: 'Marquer en cours', icon: Edit, onClick: () => handleStatusUpdate('in_progress') },
        { label: 'Archiver', icon: Archive, onClick: () => handleStatusUpdate('completed') }
      ],
      in_progress: [
        { label: 'Terminer', icon: Archive, onClick: () => handleStatusUpdate('completed') }
      ],
      completed: [
        { label: 'Rouvrir', icon: Edit, onClick: () => handleStatusUpdate('published') }
      ]
    }

    return [
      ...baseActions,
      ...(statusActions[mission.status as keyof typeof statusActions] || []),
      { label: 'Supprimer', icon: Trash2, onClick: () => {}, danger: true }
    ]
  }

  return (
    <div className="relative">
      <MagneticButton
        variant="ghost"
        size="sm"
        onClick={() => setShowMenu(!showMenu)}
      >
        <MoreVertical size={16} />
      </MagneticButton>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-lg z-10"
          >
            <div className="p-2">
              {getAvailableActions().map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    action.danger 
                      ? 'text-red-600 hover:bg-red-50' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <action.icon size={14} />
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
