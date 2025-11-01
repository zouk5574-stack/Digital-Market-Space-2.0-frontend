// components/admin/moderation/moderation-queue.tsx
'use client'

import { ReportedItem } from '@/hooks/admin/use-moderation'
import { motion } from 'framer-motion'
import { Briefcase, User, Star, MessageSquare, Clock, AlertTriangle } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface ModerationQueueProps {
  items: ReportedItem[]
  onAction: (params: { reportId: string; action: string; reason?: string }) => void
  isLoading: boolean
}

export function ModerationQueue({ items, onAction, isLoading }: ModerationQueueProps) {
  const getPriorityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-slate-400'
      default: return 'bg-slate-400'
    }
  }

  const handleQuickAction = (reportId: string, action: string) => {
    onAction({ reportId, action })
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
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

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">File d'attente vide</h3>
        <p className="text-slate-600">Aucun contenu urgent nécessitant une modération immédiate</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-amber-50">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-amber-600" size={20} />
          <div>
            <h3 className="text-lg font-semibold text-slate-900">File d'Attente Prioritaire</h3>
            <p className="text-slate-600 text-sm">
              {items.length} élément{items.length > 1 ? 's' : ''} nécessitant une attention immédiate
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        {items.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Indicateur de priorité */}
              <div className={`w-3 h-12 rounded-full ${getPriorityColor(item.severity)}`} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {item.type === 'mission' && <Briefcase size={16} className="text-blue-600" />}
                    {item.type === 'user' && <User size={16} className="text-green-600" />}
                    {item.type === 'review' && <Star size={16} className="text-amber-600" />}
                    {item.type === 'message' && <MessageSquare size={16} className="text-purple-600" />}
                    
                    <span className="font-medium text-slate-900 capitalize">
                      {item.type}
                    </span>
                  </div>

                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                    {item.severity === 'critical' ? 'CRITIQUE' : 'HAUTE PRIORITÉ'}
                  </span>
                </div>

                <p className="text-slate-700 mb-2">
                  <strong>Raison:</strong> {item.reason}
                </p>

                {item.description && (
                  <p className="text-sm text-slate-600 mb-3">
                    {item.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    Signalé le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                  <span>Par {item.reporter.firstName} {item.reporter.lastName}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <MagneticButton
                  size="sm"
                  onClick={() => handleQuickAction(item._id, 'delete')}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Supprimer
                </MagneticButton>
                <MagneticButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(item._id, 'warn')}
                >
                  Avertir
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
