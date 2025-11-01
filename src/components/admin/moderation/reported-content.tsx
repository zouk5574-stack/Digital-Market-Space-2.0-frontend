// components/admin/moderation/reported-content.tsx
'use client'

import { useState } from 'react'
import { ReportedItem } from '@/hooks/admin/use-moderation'
import { motion } from 'framer-motion'
import { 
  Flag, 
  User, 
  Briefcase, 
  MessageSquare, 
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  MoreVertical
} from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface ReportedContentProps {
  items: ReportedItem[]
  onAction: (params: { reportId: string; action: string; reason?: string }) => void
  isLoading: boolean
}

export function ReportedContent({ items, onAction, isLoading }: ReportedContentProps) {
  const [selectedItem, setSelectedItem] = useState<ReportedItem | null>(null)
  const [actionReason, setActionReason] = useState('')

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mission': return <Briefcase size={16} className="text-blue-600" />
      case 'user': return <User size={16} className="text-green-600" />
      case 'review': return <Star size={16} className="text-amber-600" />
      case 'message': return <MessageSquare size={16} className="text-purple-600" />
      default: return <Flag size={16} className="text-slate-600" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'mission': return 'Mission'
      case 'user': return 'Utilisateur'
      case 'review': return 'Avis'
      case 'message': return 'Message'
      default: return 'Contenu'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-slate-100 text-slate-800 border-slate-200'
      default: return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const handleAction = (action: string) => {
    if (selectedItem) {
      onAction({
        reportId: selectedItem._id,
        action,
        reason: actionReason
      })
      setSelectedItem(null)
      setActionReason('')
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              </div>
              <div className="h-8 w-20 bg-slate-200 rounded"></div>
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
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun signalement</h3>
        <p className="text-slate-600">Tous les signalements ont été traités !</p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Contenu Signalé</h3>
          <p className="text-slate-600 text-sm mt-1">
            {items.length} signalement{items.length > 1 ? 's' : ''} à traiter
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    {getTypeIcon(item.type)}
                    <div>
                      <h4 className="font-medium text-slate-900">
                        {getTypeLabel(item.type)} signalé{e}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Par {item.reporter.firstName} {item.reporter.lastName}
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
                      <Clock size={14} />
                      {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(item.severity)}`}>
                      {item.severity === 'critical' ? 'Critique' :
                       item.severity === 'high' ? 'Élevé' :
                       item.severity === 'medium' ? 'Moyen' : 'Faible'}
                    </span>

                    {item.status === 'in_review' && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        En révision
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <MagneticButton
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedItem(item)}
                  >
                    <MoreVertical size={16} />
                    Actions
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal d'actions */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Actions de Modération</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Raison de l'action (optionnel)
                </label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder="Expliquez la raison de votre action..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MagneticButton
                  variant="outline"
                  onClick={() => handleAction('approve')}
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <CheckCircle size={16} />
                  Approuver
                </MagneticButton>

                <MagneticButton
                  variant="outline"
                  onClick={() => handleAction('reject')}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  <X size={16} />
                  Rejeter
                </MagneticButton>

                <MagneticButton
                  variant="outline"
                  onClick={() => handleAction('delete')}
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <AlertTriangle size={16} />
                  Supprimer
                </MagneticButton>

                <MagneticButton
                  variant="outline"
                  onClick={() => handleAction('warn')}
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <Flag size={16} />
                  Avertir
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
