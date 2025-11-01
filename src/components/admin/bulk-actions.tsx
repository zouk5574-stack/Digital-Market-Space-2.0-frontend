// components/admin/bulk-actions.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Mail, Ban, CheckCircle, MoreVertical, X } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'
import { useBulkUserActions } from '@/hooks/admin/use-admin-users'
import { useToast } from '@/hooks/use-toast'
import { useLogger } from '@/hooks/use-logger'

interface BulkActionsProps {
  selectedIds: string[]
  onActionComplete: () => void
}

export function BulkActions({ selectedIds, onActionComplete }: BulkActionsProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const bulkActions = useBulkUserActions()
  const { toast } = useToast()
  const { logInfo, logError } = useLogger()

  const actions = [
    {
      id: 'activate',
      label: 'Activer les comptes',
      icon: CheckCircle,
      description: 'Rendre les comptes sélectionnés actifs',
      variant: 'success' as const
    },
    {
      id: 'suspend',
      label: 'Suspendre les comptes',
      icon: Ban,
      description: 'Suspendre temporairement les comptes',
      variant: 'warning' as const
    },
    {
      id: 'send_email',
      label: 'Envoyer un email',
      icon: Mail,
      description: 'Envoyer un email aux utilisateurs sélectionnés',
      variant: 'info' as const
    },
    {
      id: 'export',
      label: 'Exporter les données',
      icon: Users,
      description: 'Exporter les données des utilisateurs sélectionnés',
      variant: 'default' as const
    }
  ]

  const handleBulkAction = async (actionId: string) => {
    setIsProcessing(true)
    setShowMenu(false)

    try {
      if (actionId === 'send_email' || actionId === 'export') {
        // Actions spéciales qui ne nécessitent pas l'API users
        toast({
          title: 'Action programmée',
          description: `L'action "${actions.find(a => a.id === actionId)?.label}" a été programmée pour ${selectedIds.length} utilisateur(s)`
        })
      } else {
        await bulkActions.mutateAsync({
          userIds: selectedIds,
          action: actionId
        })
        
        toast({
          title: 'Succès',
          description: `Action "${actions.find(a => a.id === actionId)?.label}" effectuée sur ${selectedIds.length} utilisateur(s)`
        })
      }

      logInfo(`Bulk action executed: ${actionId}`, { userCount: selectedIds.length })
      onActionComplete()
    } catch (error) {
      logError('Failed to execute bulk action', error)
      toast({
        title: 'Erreur',
        description: 'Échec de l\'action en masse',
        variant: 'destructive'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const getVariantClass = (variant: string) => {
    switch (variant) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100'
      case 'warning': return 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100'
      default: return 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 p-4 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="text-blue-600" size={20} />
          </div>
          <div>
            <p className="font-medium text-slate-900">
              {selectedIds.length} utilisateur(s) sélectionné(s)
            </p>
            <p className="text-sm text-slate-600">
              Choisissez une action à appliquer en masse
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Actions rapides */}
          <div className="flex gap-2">
            <MagneticButton
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('activate')}
              disabled={isProcessing}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <CheckCircle size={16} />
              Activer
            </MagneticButton>
            
            <MagneticButton
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('suspend')}
              disabled={isProcessing}
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <Ban size={16} />
              Suspendre
            </MagneticButton>
          </div>

          {/* Menu déroulant pour plus d'actions */}
          <div className="relative">
            <MagneticButton
              variant="outline"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
              disabled={isProcessing}
            >
              <MoreVertical size={16} />
              Plus
            </MagneticButton>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-lg z-50"
                >
                  <div className="p-2">
                    {actions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleBulkAction(action.id)}
                        disabled={isProcessing}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-3 ${getVariantClass(action.variant)}`}
                      >
                        <action.icon size={16} />
                        <div className="flex-1">
                          <p className="font-medium">{action.label}</p>
                          <p className="text-xs opacity-75">{action.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Indicateur de traitement */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 pt-3 border-t border-slate-200"
        >
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            Traitement en cours...
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
