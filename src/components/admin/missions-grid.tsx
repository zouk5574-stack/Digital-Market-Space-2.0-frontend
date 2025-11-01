// components/admin/missions-grid.tsx
'use client'

import { MissionStatusBadge } from '@/components/admin/badges/mission-status-badge'
import { MissionActions } from '@/components/admin/mission-actions'
import { motion } from 'framer-motion'
import { DollarSign, Calendar, Users, MapPin } from 'lucide-react'

interface MissionsGridProps {
  missions: any[]
  isLoading: boolean
  onMissionUpdate: () => void
}

export function MissionsGrid({ missions, isLoading, onMissionUpdate }: MissionsGridProps) {
  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      'web_development': '🌐 Développement Web',
      'mobile_development': '📱 Développement Mobile',
      'graphic_design': '🎨 Design Graphique'
    }
    return categories[category] || category
  }

  const formatBudget = (budget: number) => {
    if (budget >= 1000000) {
      return `${(budget / 1000000).toFixed(1)}M FCFA`
    }
    return `${(budget / 1000).toFixed(0)}K FCFA`
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-2/3 mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-slate-200 rounded w-1/3"></div>
              <div className="h-6 bg-slate-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (missions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="text-slate-400" size={24} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucune mission trouvée</h3>
        <p className="text-slate-600">
          Aucune mission ne correspond à vos critères de recherche.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {missions.map((mission, index) => (
        <motion.div
          key={mission._id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group"
        >
          {/* En-tête avec titre et actions */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {mission.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <MissionStatusBadge status={mission.status} />
                {mission.isFeatured && (
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
                    ⭐ En vedette
                  </span>
                )}
              </div>
            </div>
            <MissionActions mission={mission} onUpdate={onMissionUpdate} />
          </div>
          
          {/* Description */}
          <p className="text-slate-600 text-sm mb-4 line-clamp-3">
            {mission.description}
          </p>
          
          {/* Catégorie et tags */}
          <div className="mb-4">
            <p className="text-sm text-slate-700 mb-2">
              {getCategoryLabel(mission.category)}
            </p>
            <div className="flex flex-wrap gap-1">
              {mission.tags?.slice(0, 3).map((tag: string, i: number) => (
                <span 
                  key={i}
                  className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
              {mission.tags?.length > 3 && (
                <span className="text-slate-500 text-xs">+{mission.tags.length - 3}</span>
              )}
            </div>
          </div>
          
          {/* Métriques */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-slate-600">
                <DollarSign size={14} />
                <span className="font-semibold text-slate-900">{formatBudget(mission.budget)}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <Users size={14} />
                <span>{mission.applicationsCount} candidatures</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Créé le {new Date(mission.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                {mission.viewsCount} vues
              </span>
            </div>
          </div>
          
          {/* Échéance */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Échéance:</span>
              <span className="font-medium text-slate-900">
                {new Date(mission.deadline).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
