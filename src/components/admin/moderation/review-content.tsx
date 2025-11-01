// components/admin/moderation/review-content.tsx
'use client'

import { ReportedItem } from '@/hooks/admin/use-moderation'
import { motion } from 'framer-motion'
import { Clock, User, CheckCircle, X, AlertCircle } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface ReviewContentProps {
  items: ReportedItem[]
  onAction: (params: { reportId: string; action: string; reason?: string }) => void
  isLoading: boolean
}

export function ReviewContent({ items, onAction, isLoading }: ReviewContentProps) {
  const getTimeInReview = (createdAt: string) => {
    const created = new Date(createdAt)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'Moins d\'une heure'
    if (diffHours < 24) return `${diffHours}h`
    return `${Math.floor(diffHours / 24)}j`
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
                <div className="h-8 w-20 bg-slate-200 rounded"></div>
                <div className="h-8 w-20 bg-slate-200 rounded"></div>
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
        <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun contenu en révision</h3>
        <p className="text-slate-600">Tous les signalements ont été traités ou sont en attente</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-blue-50">
        <div className="flex items-center gap-3">
          <Clock className="text-blue-600" size={20} />
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Contenu en Révision</h3>
            <p className="text-slate-600 text-sm">
              {items.length} élément{items.length > 1 ? 's' : ''} en cours d'examen
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
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 capitalize">
                      {item.type} signalé{e}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      En révision depuis {getTimeInReview(item.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-slate-900 font-medium mb-1">
                    Raison: {item.reason}
                  </p>
                  {item.description && (
                    <p className="text-sm text-slate-600">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <AlertCircle size={14} />
                    Signalé par {item.reporter.firstName} {item.reporter.lastName}
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                    item.severity === 'critical' ? 'bg-red-100 text-red-800 border-red-200' :
                    item.severity === 'high' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                    'bg-blue-100 text-blue-800 border-blue-200'
                  }`}>
                    {item.severity === 'critical' ? 'Critique' :
                     item.severity === 'high' ? 'Élevé' : 'Moyen'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <MagneticButton
                  variant="primary"
                  size="sm"
                  onClick={() => onAction({ 
                    reportId: item._id, 
                    action: 'approve',
                    reason: 'Contenu approuvé après révision'
                  })}
                >
                  <CheckCircle size={16} />
                  Approuver
                </MagneticButton>
                
                <MagneticButton
                  variant="outline"
                  size="sm"
                  onClick={() => onAction({ 
                    reportId: item._id, 
                    action: 'delete',
                    reason: 'Contenu supprimé après révision'
                  })}
                >
                  <X size={16} />
                  Supprimer
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
