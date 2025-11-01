// components/admin/moderation/moderation-history.tsx
'use client'

import { ReportedItem } from '@/hooks/admin/use-moderation'
import { motion } from 'framer-motion'
import { CheckCircle, X, Clock, AlertTriangle, TrendingUp } from 'lucide-react'

interface ModerationHistoryProps {
  items: ReportedItem[]
  stats: any
  isLoading: boolean
}

export function ModerationHistory({ items, stats, isLoading }: ModerationHistoryProps) {
  const getActionIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="text-green-500" size={16} />
      case 'dismissed': return <X className="text-slate-500" size={16} />
      default: return <Clock className="text-amber-500" size={16} />
    }
  }

  const getActionLabel = (status: string) => {
    switch (status) {
      case 'resolved': return 'Résolu'
      case 'dismissed': return 'Rejeté'
      default: return 'En attente'
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/3"></div>
              </div>
              <div className="h-6 bg-slate-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Statistiques de l'historique */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Résolus aujourd'hui</p>
              <p className="text-xl font-bold text-slate-900">{stats.resolvedToday}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Temps moyen</p>
              <p className="text-xl font-bold text-slate-900">{stats.averageResolutionTime}min</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-amber-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Taux de résolution</p>
              <p className="text-xl font-bold text-slate-900">
                {items.length > 0 ? Math.round((items.filter(item => item.status === 'resolved').length / items.length) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste de l'historique */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Historique Récent</h3>
          <p className="text-slate-600 text-sm mt-1">
            Dernières actions de modération
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {items.slice(0, 10).map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {getActionIcon(item.status)}
                      <span className="font-medium text-slate-900 capitalize">
                        {item.type} - {item.reason}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'resolved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {getActionLabel(item.status)}
                    </span>
                  </div>

                  <div className="text-sm text-slate-600">
                    <p>Signalé par {item.reporter.firstName} {item.reporter.lastName}</p>
                    <p className="mt-1">
                      {item.resolvedAt 
                        ? `Résolu le ${new Date(item.resolvedAt).toLocaleDateString('fr-FR')}`
                        : `Signalé le ${new Date(item.createdAt).toLocaleDateString('fr-FR')}`
                      }
                    </p>
                  </div>
                </div>

                {item.severity === 'critical' && (
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertTriangle size={16} />
                    <span className="text-sm font-medium">Critique</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
