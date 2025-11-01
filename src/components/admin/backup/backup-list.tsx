// components/admin/backup/backup-list.tsx
'use client'

import { useState } from 'react'
import { Backup } from '@/hooks/admin/use-backup-system'
import { motion } from 'framer-motion'
import { Download, Trash2, Clock, AlertCircle, CheckCircle, Play } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface BackupListProps {
  backups: Backup[]
  onDeleteBackup: (backupId: string) => void
  isLoading?: boolean
}

export function BackupList({ backups, onDeleteBackup, isLoading = false }: BackupListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${Math.round(mb)} MB`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (status: Backup['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />
      case 'in_progress':
        return <Play className="text-blue-500" size={16} />
      case 'failed':
        return <AlertCircle className="text-red-500" size={16} />
      default:
        return <Clock className="text-slate-400" size={16} />
    }
  }

  const getStatusText = (status: Backup['status']) => {
    switch (status) {
      case 'completed':
        return 'Terminée'
      case 'in_progress':
        return 'En cours...'
      case 'failed':
        return 'Échec'
      default:
        return 'Inconnu'
    }
  }

  const handleDelete = async (backupId: string) => {
    setDeletingId(backupId)
    try {
      await onDeleteBackup(backupId)
    } finally {
      setDeletingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded w-48"></div>
                <div className="h-3 bg-slate-200 rounded w-32"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-slate-200 rounded"></div>
                <div className="h-8 w-8 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (backups.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Database className="mx-auto text-slate-400" size={48} />
        <h3 className="text-lg font-semibold text-slate-900 mt-4">Aucune sauvegarde</h3>
        <p className="text-slate-600 mt-2">Créez votre première sauvegarde pour protéger vos données</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Sauvegardes Disponibles</h3>
        <p className="text-slate-600 text-sm mt-1">
          {backups.length} sauvegarde{backups.length > 1 ? 's' : ''} trouvée{backups.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="divide-y divide-slate-200">
        {backups.map((backup, index) => (
          <motion.div
            key={backup._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-slate-900 truncate">
                    {backup.filename}
                  </h4>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium border
                    ${backup.type === 'full' 
                      ? 'bg-blue-100 text-blue-800 border-blue-200' 
                      : 'bg-purple-100 text-purple-800 border-purple-200'
                    }
                  `}>
                    {backup.type === 'full' ? 'Complète' : 'Partielle'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <HardDrive size={14} />
                    {formatSize(backup.size)}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {formatDate(backup.createdAt)}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {getStatusIcon(backup.status)}
                    {getStatusText(backup.status)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                {backup.downloadUrl && (
                  <MagneticButton variant="outline" size="sm">
                    <Download size={16} />
                    Télécharger
                  </MagneticButton>
                )}
                
                <MagneticButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(backup._id)}
                  disabled={deletingId === backup._id || backup.status === 'in_progress'}
                >
                  <Trash2 size={16} />
                  {deletingId === backup._id ? 'Suppression...' : 'Supprimer'}
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
