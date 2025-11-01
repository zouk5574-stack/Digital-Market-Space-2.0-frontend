// components/admin/actions/user-actions.tsx
'use client'

import { useState } from 'react'
import { User } from '@/types'
import { useUpdateUserStatus } from '@/hooks/admin/use-admin-users'
import { MagneticButton } from '@/components/atomic/magnetic-button'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreVertical, Eye, Edit, Mail, Ban, CheckCircle, Trash2, Shield } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useLogger } from '@/hooks/use-logger'

interface UserActionsProps {
  user: User
  onUpdate: () => void
}

export function UserActions({ user, onUpdate }: UserActionsProps) {
  const [showMenu, setShowMenu] = useState(false)
  const updateStatus = useUpdateUserStatus()
  const { toast } = useToast()
  const { logInfo, logError } = useLogger()

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateStatus.mutateAsync({
        userId: user._id,
        status: newStatus
      })
      
      toast({
        title: 'Succès',
        description: `Statut de ${user.firstName} ${user.lastName} mis à jour`
      })
      
      logInfo('User status updated', { userId: user._id, newStatus })
      onUpdate()
    } catch (error) {
      logError('Failed to update user status', error)
      toast({
        title: 'Erreur',
        description: 'Échec de la mise à jour du statut',
        variant: 'destructive'
      })
    }
    setShowMenu(false)
  }

  const getAvailableActions = () => {
    const baseActions = [
      { 
        label: 'Voir le profil', 
        icon: Eye, 
        onClick: () => console.log('View profile:', user._id),
        variant: 'default' as const
      },
      { 
        label: 'Modifier', 
        icon: Edit, 
        onClick: () => console.log('Edit user:', user._id),
        variant: 'default' as const
      },
      { 
        label: 'Envoyer un email', 
        icon: Mail, 
        onClick: () => console.log('Send email to:', user.email),
        variant: 'info' as const
      }
    ]

    const statusActions = user.status === 'active' 
      ? [{ 
          label: 'Suspendre le compte', 
          icon: Ban, 
          onClick: () => handleStatusUpdate('suspended'),
          variant: 'warning' as const
        }]
      : [{ 
          label: 'Activer le compte', 
          icon: CheckCircle, 
          onClick: () => handleStatusUpdate('active'),
          variant: 'success' as const
        }]

    const adminActions = user.role !== 'admin' 
      ? [{ 
          label: 'Rendre admin', 
          icon: Shield, 
          onClick: () => console.log('Make admin:', user._id),
          variant: 'primary' as const
        }]
      : []

    const dangerActions = [
      { 
        label: 'Supprimer le compte', 
        icon: Trash2, 
        onClick: () => console.log('Delete user:', user._id),
        variant: 'danger' as const
      }
    ]

    return [...baseActions, ...statusActions, ...adminActions, ...dangerActions]
  }

  const getActionClass = (variant: string) => {
    switch (variant) {
      case 'danger': return 'text-red-600 hover:bg-red-50'
      case 'warning': return 'text-amber-600 hover:bg-amber-50'
      case 'success': return 'text-green-600 hover:bg-green-50'
      case 'info': return 'text-blue-600 hover:bg-blue-50'
      case 'primary': return 'text-purple-600 hover:bg-purple-50'
      default: return 'text-slate-700 hover:bg-slate-50'
    }
  }

  return (
    <div className="relative">
      <MagneticButton
        variant="ghost"
        size="sm"
        onClick={() => setShowMenu(!showMenu)}
        disabled={updateStatus.isPending}
      >
        <MoreVertical size={16} />
      </MagneticButton>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-lg z-50"
          >
            <div className="p-2 space-y-1">
              {getAvailableActions().map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={action.onClick}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${getActionClass(action.variant)}`}
                >
                  <action.icon size={14} />
                  {action.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
